import { v4 as uuid } from 'uuid';
import { Entity, Guard } from "../common";
import { Email } from "./email";
interface UserProps {
  email: Email;
}
export class User extends Entity<UserProps> {

  private constructor(props: UserProps, id: string) {
    super(props, id);
  }
  public static create(props: UserProps) {
    Guard.AgainstNullOrUndefined([{ propName: 'email', value: props.email }]);
    return new User(props, uuid());
  }
}
