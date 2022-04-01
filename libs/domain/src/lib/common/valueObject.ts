import { shallowEqual } from 'shallow-equal-object';

/**
 * @desc ValueObjects are objects that we determine their
 * equality through their structrual property.
 */

export abstract class ValueObject<T> {
  protected readonly _props: T;

  constructor(props: T) {
    this._props = Object.freeze(props);
  }

  public equals(vo?: ValueObject<T>): boolean {
    if (vo === null || vo === undefined) {
      return false;
    }
    if (vo._props === undefined) {
      return false;
    }
    return shallowEqual(this._props, vo._props);
  }
}
