import {
  createParamDecorator,
  BadRequestException,
  ExecutionContext,
} from '@nestjs/common';
import {
  Filter,
  FilteredFields,
  PrismaFilter,
  Rule,
} from '@agriness/domain/types';
import { Request } from 'express';

export const FilterParams = createParamDecorator<
  string[] | undefined,
  ExecutionContext,
  PrismaFilter | FilteredFields
>((canFilterFields, ctx) => {
  const request = ctx
    .switchToHttp()
    .getRequest<Request<unknown, unknown, unknown, Filter | undefined>>();
  const q = request.query?.q;

  if (!q) {
    return {};
  }

  const orQueries: PrismaFilter[] = [];
  const andQueries: PrismaFilter[] = [];

  const conditions = q.split(/\{(OR|AND)\}/);

  let curBoolean = 'OR';

  conditions.forEach((condition) => {
    if (condition === 'OR' || condition === 'AND') {
      curBoolean = condition;
      return;
    }

    const [field, rule, value] = condition.split(':') as [string, Rule, string];

    if (canFilterFields && !canFilterFields.includes(field)) {
      throw new BadRequestException(
        `Field ${field} is not allowed to be filtered`,
      );
    }

    if (!field || !rule || !value) {
      throw new BadRequestException(
        'Invalid filter query, it should follow the pattern <field>:<rule>:<value>',
      );
    }

    if (curBoolean === 'OR') {
      orQueries.push({ [field]: { [rule]: value } });
    } else {
      andQueries.push({ [field]: { [rule]: value } });
    }
  });

  if (orQueries.length === 1 && andQueries.length === 0 && orQueries[0]) {
    return orQueries[0];
  }

  if (andQueries.length === 1 && orQueries.length === 0 && andQueries[0]) {
    return andQueries[0];
  }

  return {
    OR: orQueries,
    AND: andQueries,
  };
});
