import { Expose } from "class-transformer";
import { Guard, ValueObject } from "../common";
interface GoogleIdProps {
  id: string;
}
export class GoogleId extends ValueObject<GoogleIdProps> {
  @Expose()
  get value() {
    return this._props.id;
  }
  private constructor(props: GoogleIdProps) {
    super(props);
  }
  public static create(props: GoogleIdProps) {
    Guard.AgainstNullOrUndefined([{ propName: 'googleId', value: props.id }]);
    return new GoogleId(props);
  }
}
