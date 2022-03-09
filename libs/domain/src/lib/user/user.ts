import { v4 as uuid } from 'uuid';
import { Entity, Guard } from "../common";
import { Email } from "./email";
interface UserProps {
  email: Email;
}
export class User extends Entity<UserProps> {

  get id() {
    return this._id;
  }
  get email() {
    return this.props.email;
  }
  private constructor(props: UserProps, id: string) {
    super(props, id);
  }
  public static create(props: UserProps, id = '') {
    Guard.AgainstNullOrUndefined([{ propName: 'email', value: props.email }]);
    return new User(props, id || uuid());
  }
}
