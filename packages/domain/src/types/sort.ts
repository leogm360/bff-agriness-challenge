import { ArrayDelimiter } from './generic';

export type SortOrder = 'asc' | 'desc';

export type SortingString = `${string}:${SortOrder}${ArrayDelimiter | ''}`;

export interface Sort {
  sort: SortingString;
}

export type SortedFields = Record<string, SortOrder>;
