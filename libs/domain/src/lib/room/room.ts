import { Entity, Guard } from "../common";
import { Message } from "../message";
import { User } from "../user";
interface RoomProps {
  name: string;
  users: User[];
  messages: Message[];
}
export class Room extends Entity<RoomProps>{
  get id() {
    return this._id;
  }
  get name() {
    return this.props.name;
  }
  get messages() {
    return this.props.messages;
  }
  get users() {
    return this.props.users;
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
