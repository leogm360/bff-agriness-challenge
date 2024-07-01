import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Include, IncludedFields } from '@agriness/domain/types';
import { Request } from 'express';

export const IncludeParams = createParamDecorator<
  string[] | undefined,
  ExecutionContext,
  IncludedFields
>((defaultIncludedFields, ctx) => {
  const request = ctx
    .switchToHttp()
    .getRequest<Request<unknown, unknown, unknown, Include | undefined>>();
  let include = request.query?.include;

  const toInclude: IncludedFields = {};

  if (defaultIncludedFields) {
    defaultIncludedFields.forEach((field) => {
      toInclude[field] = true;
    });
  }

  include?.split(',').forEach((field) => {
    if (toInclude[field]) {
      return;
    }

    if (defaultIncludedFields?.includes(field)) {
      return;
    }

    toInclude[field] = true;
  }, {} as IncludedFields);

  return toInclude;
});
