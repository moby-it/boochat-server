import { Entity, Guard } from "../common";
import { Message } from "../message";
import { User } from "../user";
import { Expose } from 'class-transformer';
interface RoomProps {
  name: string;
  users: Partial<User>[];
  messages: Message[];
}
export class Room extends Entity<RoomProps>{
  @Expose()
  get id() {
    return this._id;
  }
  @Expose()
  get name() {
    return this._props.name;
  }
  @Expose()
  get messages() {
    return this._props.messages;
  }
  @Expose()
  get users() {
    return this._props.users;
  }
  private constructor(props: RoomProps, id: string) {
    super(props, id);
  }
  public static create(props: RoomProps, id: string) {
    Guard.AgainstNullOrUndefined([
      { propName: 'name', value: props.name },
    ]);
    return new Room(props, id);
  }
}
