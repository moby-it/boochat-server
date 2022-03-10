import { Guard, ValueObject } from "../common";
interface GoogleIdProps {
  id: string;
}
export class GoogleId extends ValueObject<GoogleIdProps> {
  get value() {
    return this.props.id;
  }
  private constructor(props: GoogleIdProps) {
    super(props);
  }
  public static create(props: GoogleIdProps) {
    Guard.AgainstNullOrUndefined([{ propName: 'googleId', value: props.id }]);
    return new GoogleId(props);
  }
}
