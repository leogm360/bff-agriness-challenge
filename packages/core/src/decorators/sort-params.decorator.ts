import {
  createParamDecorator,
  BadRequestException,
  ExecutionContext,
} from '@nestjs/common';
import { Sort, SortedFields, SortOrder } from '@agriness/domain/types';
import { Request } from 'express';

export const SortParams = createParamDecorator<
  string[] | undefined,
  ExecutionContext,
  SortedFields[]
>((canSortFields, ctx) => {
  const request = ctx
    .switchToHttp()
    .getRequest<Request<unknown, unknown, unknown, Sort | undefined>>();
  const sort = request.query?.sort;

  if (!sort) {
    return [];
  }

  if (!canSortFields) {
    return [];
  }

  const toSort = sort.split(',').map((sort) => {
    const [field, order] = sort.split(':');

    if (!field || !order) {
      throw new BadRequestException(
        'Invalid sort query, it should be field:order',
      );
    }

    if (!canSortFields.includes(field)) {
      throw new BadRequestException(
        `Invalid sort ${field} field, it should be one of ${canSortFields}`,
      );
    }

    return { [field]: order as SortOrder };
  });

  return toSort;
});
