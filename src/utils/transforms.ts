import { camelCase, mapKeys, snakeCase } from 'lodash';

export const decamelize = (input: Record<string, never>) => {
  if (Array.isArray(input)) {
    return input.map((obj) => mapKeys(obj, (v, k) => snakeCase(k)));
  }

  return mapKeys(input, (v, k) => snakeCase(k));
};

export const camelize = (input: Record<string, never>) => {
  if (Array.isArray(input)) {
    return input.map((obj) => mapKeys(obj, (v, k) => camelCase(k)));
  }

  return mapKeys(input, (v, k) => camelCase(k));
};
