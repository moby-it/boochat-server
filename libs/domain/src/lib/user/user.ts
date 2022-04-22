import { Expose } from 'class-transformer';
import { Entity, Guard } from '../common';
interface UserProps {
  name: string;
  imageUrl: string;
}
export class User extends Entity<UserProps> {
  @Expose()
  get id() {
    return this._id;
  }

  @Expose()
  get name() {
    return this._props.name;
  }
  @Expose()
  get imageUrl() {
    return this._props.imageUrl;
  }
  private constructor(props: UserProps, _id: string) {
    super(props, _id);
  }
  public static create(props: UserProps, _id: string) {
    return new User(props, _id);
  }
}
