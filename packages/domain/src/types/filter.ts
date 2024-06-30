import { ArrayOrDelimiter, ArrayAndDelimiter } from './generic';

export type Rule = 'equals';

export type FilterField = Record<string, Rule>;

export type FileringString =
  `${string}:${Rule}:${string}${ArrayOrDelimiter | ArrayAndDelimiter | ''}`;

export type Filter = {
  q: string;
};

export type PrismaFilter = Record<
  string,
  {
    [rule in Rule]: string;
  }
>;

export interface FilteredFields {
  OR?: PrismaFilter[];
  AND?: PrismaFilter[];
}
