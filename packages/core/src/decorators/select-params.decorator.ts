import {
  createParamDecorator,
  // BadRequestException,
  ExecutionContext,
} from '@nestjs/common';
import { Select, SelectedFields } from '@agriness/domain/types';
import { Request } from 'express';

export const SelectParams = createParamDecorator<
  string[],
  ExecutionContext,
  {} | null
>((defaultSelectedFields, ctx) => {
  const request = ctx
    .switchToHttp()
    .getRequest<Request<unknown, unknown, unknown, Select | undefined>>();
  const select = request.query?.select;

  if (!select) {
    return defaultSelectedFields.reduce(
      (acc, field) => ({
        ...acc,
        [field]: true,
      }),
      {} as SelectedFields,
    );
  }

  const toSelect = select.split(',').reduce(
    (acc, field) => ({
      ...acc,
      [field]: true,
    }),
    {} as SelectedFields,
  );

  return toSelect;
});
