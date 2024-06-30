import { IsOptional, IsObject, IsNumber } from 'class-validator';
import { Search, Query, OR, AND, Sort } from '../../types';

export class SearchDto<T> implements Search<T> {
  @IsOptional()
  @IsObject()
  query?: Query<T> | OR<T> | AND<T>;

  @IsOptional()
  @IsNumber()
  page?: number;

  @IsOptional()
  @IsNumber()
  size?: number;

  @IsOptional()
  @IsObject()
  sort?: Sort<T>;
}
