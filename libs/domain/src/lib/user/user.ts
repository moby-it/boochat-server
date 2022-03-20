import { Expose } from 'class-transformer';
import { Socket } from 'socket.io';
import { AggregateRootEntity, Guard, RoomId } from "../common";
import { CreateRoomEvent, SendMessageEvent, UserConnectedEvent, UserDisconnectedEvent } from './events';
interface UserProps {
  name: string;
  googleId: string;
}
export class User extends AggregateRootEntity<UserProps> {


  @Expose()
  get id() {
    return this._id;
  }

  @Expose()
  get googleId() {
    return this._props.googleId;
  }

  @Expose()
  get name() {
    return this._props.name;
  }
  private constructor(props: UserProps, _id: string) {
    super(props, _id);
  }
  public static create(props: UserProps, _id: string) {
    Guard.AgainstNullOrUndefined([{ propName: 'googleId', value: props.googleId }]);
    return new User(props, _id);
  }
  cameOnline(user: User, socket: Socket) {
    this.apply(new UserConnectedEvent(user, socket));
  }
  cameOffline(user: User, socket: Socket) {
    this.apply(new UserDisconnectedEvent(user, socket));
  }
  sendsMessage(content: string, senderId: string, roomId: RoomId, timestamp: Date,) {
    this.apply(new SendMessageEvent(content, senderId, roomId, timestamp,));
  }
  createRoom(name: string, userIds: string[]) {
    this.apply(new CreateRoomEvent(name, userIds));
  }
  // inviteUserToRoom() {

  // }
  // userLeavesRoom() {

  // }
  // logRoomVisit() {

  // }
}
