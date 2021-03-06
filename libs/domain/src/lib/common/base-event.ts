import { v4 as uuid } from 'uuid';
export abstract class BaseEvent {
  private readonly _id: string;
  public abstract readonly type: number;
  public abstract readonly userId: string;
  public abstract readonly createdAt: Date;
  protected constructor() {
    this._id = uuid();
  }
  get id() {
    return this._id;
  }
}
