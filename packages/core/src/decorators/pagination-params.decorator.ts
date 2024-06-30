import {
  createParamDecorator,
  BadRequestException,
  ExecutionContext,
} from '@nestjs/common';
import { Pagination, PaginatedFields } from '@agriness/domain/types';
import { Request } from 'express';

const DEFAULT_PAGE = 1;

const DEFAULT_SIZE = 10;

export const PaginationParams = createParamDecorator<
  undefined,
  ExecutionContext,
  PaginatedFields
>((_, ctx) => {
  const req = ctx
    .switchToHttp()
    .getRequest<Request<unknown, unknown, unknown, Pagination>>();
  const page = parseInt(req.query?.page ?? DEFAULT_PAGE.toString());
  const size = parseInt(req.query?.size ?? DEFAULT_SIZE.toString());

  if (Number.isNaN(page) || Number.isNaN(size) || page < 1 || size < 1) {
    throw new BadRequestException(
      'Invalid pagination params, page and limit must be numbers greater than 0',
    );
  }

  if (size > 100) {
    throw new BadRequestException(
      'Invalid pagination params, limit must be less than 100',
    );
  }

  return {
    offset: (page - 1) * size,
    limit: size,
  };
});
