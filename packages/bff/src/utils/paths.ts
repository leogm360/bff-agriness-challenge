import { Queries } from '@types';

export function createLinkFromQueries(basePath: string, queries?: Queries) {
  if (!queries) {
    return basePath.trim();
  }

  return (
    basePath +
    Object.entries(queries)
      .reduce((acc, [key, value], idx) => {
        if (value && idx === 0) {
          return `${acc}?${key}=${value}`;
        }

        if (value) {
          return `${acc}&${key}=${value}`;
        }

        return acc;
      }, '')
      .trim()
  );
}
