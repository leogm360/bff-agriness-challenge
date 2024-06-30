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
  string[],
  ExecutionContext,
  FilteredFields
>((filterFields, ctx) => {
  const request = ctx
    .switchToHttp()
    .getRequest<Request<unknown, unknown, unknown, Filter | undefined>>();
  const q = request.query?.q;

  if (!q) {
    return filterFields.reduce(
      (acc, field) => ({
        ...acc,
        [field]: {
          equals: '',
        },
      }),
      {} as FilteredFields,
    );
  }

  const orQueries: PrismaFilter[] = [];
  const andQueries: PrismaFilter[] = [];

  const conditions = q.split(/\{(OR|AND)\}/);

  let curBoolean = 'AND';

  conditions.forEach((condition) => {
    if (condition === 'OR' || condition === 'AND') {
      curBoolean = condition;
      return;
    }

    const [field, rule, value] = condition.split(':') as [string, Rule, string];

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

  return {
    OR: orQueries,
    AND: andQueries,
  };
});
