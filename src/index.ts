import camelCase from 'lodash/camelCase';
import snakeCase from 'lodash/snakeCase';
import kebabCase from 'lodash/kebabCase';
import lowerCase from 'lodash/lowerCase';
import upperCase from 'lodash/upperCase';
import startCase from 'lodash/startCase';
import upperFirst from 'lodash/upperFirst';

import isPlainObject from 'lodash/isPlainObject';
import isArray from 'lodash/isArray';

interface Dict<T> {
  [key: string]: T;
  [key: number]: T;
}

function deepTransformKeys(transformFunc: (str?: string) => string) {
  return function transformAny<T>(
    anyValue: T,
    exceptions?: Dict<string>
  ): T | Dict<any>[] | Dict<any> {
    if (isPlainObject(anyValue)) {
      const dict: Dict<any> = anyValue;
      return Object.keys(dict).reduce((data, value): Dict<any> => {
        const transformedKey: string =
          exceptions && Boolean(exceptions[value])
            ? (exceptions[value] as string)
            : transformFunc(value);
        return {
          ...data,
          [transformedKey]: transformAny(dict[value], exceptions),
        };
      }, {} as Dict<any>);
    }
    if (isArray(anyValue)) {
      return anyValue.map(val => transformAny(val, exceptions));
    }
    return anyValue;
  };
}

/**
 * Converts objects keys to camel case string (deeply),
 * effective on objects and arrays,
 * returns the original argument untouched otherwise.
 */
export const camelCaseKeys = deepTransformKeys(camelCase);

/**
 * Converts objects keys to snake case string (deeply),
 * effective on objects and arrays,
 * returns the original argument untouched otherwise.
 */
export const snakeCaseKeys = deepTransformKeys(snakeCase);

/**
 * Converts objects keys to kebab case string (deeply),
 * effective on objects and arrays,
 * returns the original argument untouched otherwise.
 */
export const kebabCaseKeys = deepTransformKeys(kebabCase);

/**
 * Converts objects keys to lower case string (deeply),
 * effective on objects and arrays,
 * returns the original argument untouched otherwise.
 */
export const lowerCaseKeys = deepTransformKeys(lowerCase);

/**
 * Converts objects keys to upper case string (deeply),
 * effective on objects and arrays,
 * returns the original argument untouched otherwise.
 */
export const upperCaseKeys = deepTransformKeys(upperCase);

/**
 * Converts objects keys to start case string (deeply),
 * effective on objects and arrays,
 * returns the original argument untouched otherwise.
 */
export const startCaseKeys = deepTransformKeys(startCase);

/**
 * Converts objects keys to upper first string (deeply),
 * effective on objects and arrays,
 * returns the original argument untouched otherwise.
 */
export const upperFirstKeys = deepTransformKeys(upperFirst);

/**
 * Converts objects keys using the function passed (deeply),
 * effective on objects and arrays,
 * returns the original argument untouched otherwise.
 */
export const customKeys = (fn: (str?: string) => string) =>
  deepTransformKeys(fn);
