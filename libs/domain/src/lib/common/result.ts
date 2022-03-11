export class Result<T> {
  private readonly _props: T;
  private readonly _isSuccessful: boolean;
  private constructor(props: T, isSuccessful: boolean) {
    this._props = props;
    this._isSuccessful = isSuccessful;
  }
  get props() {
    return this._props;
  }
  get failed() {
    return !this._isSuccessful;
  }
  get succeded() {
    return this._isSuccessful;
  }
  static create<T>(props: T, success: boolean) {
    return new Result(props, success);
  }
  static success<T>(props: T) {
    return new Result(props, true);
  }
  static fail<T>(props: T) {
    return new Result(props, false);
  }
}
