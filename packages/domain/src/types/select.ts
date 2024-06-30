import { ArrayDelimiter } from './generic';

export type SelectingString = `${string}${ArrayDelimiter | ''}`;

export type SelectedFields = Record<string, boolean>;

export interface Select {
  select: SelectingString;
}
