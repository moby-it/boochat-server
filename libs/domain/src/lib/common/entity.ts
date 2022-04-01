import { AggregateRoot } from '@nestjs/cqrs';

const isEntity = (
  v: unknown
): v is Entity<unknown> | AggregateRootEntity<unknown> => {
  return v instanceof Entity || v instanceof AggregateRootEntity;
};
export abstract class Entity<T> {
  constructor(protected _props: T, protected readonly _id: string) {}
  public equals(object?: Entity<T>): boolean {
    if (object == null || object == undefined) {
      return false;
    }
    if (this === object) {
      return true;
    }
    if (!isEntity(object)) {
      return false;
    }
    return this._id === object._id;
  }
}

export abstract class AggregateRootEntity<T> extends AggregateRoot {
  constructor(protected _props: T, protected readonly _id: string) {
    super();
  }
  public equals(object?: AggregateRootEntity<T>): boolean {
    if (object == null || object == undefined) {
      return false;
    }
    if (this === object) {
      return true;
    }
    if (!isEntity(object)) {
      return false;
    }
    return this._id === object._id;
  }
}
