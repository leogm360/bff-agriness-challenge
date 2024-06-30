import {
  createParamDecorator,
  BadRequestException,
  ExecutionContext,
} from '@nestjs/common';
import { Sort, SortedFields, SortOrder } from '@agriness/domain/types';
import { Request } from 'express';

export const SortParams = createParamDecorator<
  string[],
  ExecutionContext,
  SortedFields
>((sortFields, ctx) => {
  const request = ctx
    .switchToHttp()
    .getRequest<Request<unknown, unknown, unknown, Sort | undefined>>();
  const sort = request.query?.sort;

  if (!sort) {
    return sortFields.reduce(
      (acc, field) => ({
        ...acc,
        [field]: 'asc',
      }),
      {} as SortedFields,
    );
  }

  const toSort = sort.split(',').reduce((acc, sort) => {
    const [field, order] = sort.split(':');

    if (!field || !order) {
      throw new BadRequestException(
        'Invalid sort query, it should be field:order',
      );
    }

    return { ...acc, [field]: order as SortOrder };
  }, {} as SortedFields);

  return toSort;
});
