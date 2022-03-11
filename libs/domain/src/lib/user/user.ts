import { v4 as uuid } from 'uuid';
import { Entity, Guard } from "../common";
import { GoogleId } from './googleId';
interface UserProps {
  name: string;
  googleId: GoogleId;
}
export class User extends Entity<UserProps> {

  get id() {
    return this._id;
  }
  get googleId() {
    return this.props.googleId;
  }
  get name() {
    return this.props.name;
  }
  private constructor(props: UserProps, id: string) {
    super(props, id);
  }
  public static create(props: UserProps, id = uuid()) {
    Guard.AgainstNullOrUndefined([{ propName: 'googleId', value: props.googleId }]);
    return new User(props, id);
  }
}
