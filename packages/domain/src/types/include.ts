import { ArrayDelimiter } from './generic';

export type IncludingString = `${string}${ArrayDelimiter | ''}`;

export type IncludedFields = Record<string, boolean>;

export interface Include {
  include?: IncludingString;
}
