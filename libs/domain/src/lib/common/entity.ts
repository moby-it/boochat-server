const isEntity = (v: unknown): v is Entity<unknown> => {
  return v instanceof Entity;
};
export abstract class Entity<T> {
  constructor(protected _props: T, protected readonly _id: string) {}
  public equals(object?: Entity<T>): boolean {
    if (object == null) {
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
