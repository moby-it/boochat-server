import { Expose } from 'class-transformer';
import { Entity, Guard } from "../common";
import { GoogleId } from './googleId';
interface UserProps {
  name: string;
  googleId: GoogleId;
}
export class User extends Entity<UserProps> {


  @Expose()
  get id() {
    return this._id;
  }

  @Expose()
  get googleId() {
    return this._props.googleId.value;
  }

  @Expose()
  get name() {
    return this._props.name;
  }
  private constructor(props: UserProps, id: string) {
    super(props, id);
  }
  public static create(props: UserProps, id: string) {
    Guard.AgainstNullOrUndefined([{ propName: 'googleId', value: props.googleId }]);
    return new User(props, id);
  }
}
