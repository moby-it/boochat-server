export class Result<T = undefined> {
  private readonly _props: T;
  private readonly _error: unknown;
  private readonly _isSuccessful: boolean;
  private constructor(props: T, isSuccessful: boolean, error?: unknown) {
    this._props = props;
    this._isSuccessful = isSuccessful;
    this._error = error;
  }
  get props() {
    if (!this._isSuccessful) throw new Error('cannot get props of failed result');
    return this._props;
  }
  get error() {
    return this._error;
  }
  get failed() {
    return !this._isSuccessful;
  }
  get succeded() {
    return this._isSuccessful;
  }
  static success<T>(props?: T) {
    return new Result(props, true);
  }
  static fail(error?: unknown) {
    console.error(error);
    return new Result(undefined, false, error);
  }
}
