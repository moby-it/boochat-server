import { SerializeOptions } from '@nestjs/common';
import { Expose } from 'class-transformer';
import { AggregateRootEntity, Guard, RoomId, UserId } from '../common';
import {
  UserCreatedRoomEvent,
  UserInvitedToRoomEvent,
  UserLeftRoomEvent,
  UserSentMessageEvent,
  UserClosedRoomEvent,
  UserConnectedEvent,
  UserDisconnectedEvent
} from '../events';
interface UserProps {
  name: string;
  googleId: string;
  imageUrl: string;
}
@SerializeOptions({
  excludePrefixes: ['_']
})
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
  @Expose()
  get imageUrl() {
    return this._props.imageUrl;
  }
  private constructor(props: UserProps, _id: string) {
    super(props, _id);
  }
  public static create(props: UserProps, _id: string) {
    Guard.AgainstNullOrUndefined([{ propName: 'googleId', value: props.googleId }]);
    return new User(props, _id);
  }
  cameOnline(user: User) {
    this.apply(new UserConnectedEvent(user));
  }
  cameOffline(user: User) {
    this.apply(new UserDisconnectedEvent(user));
  }
  sendsMessage(content: string, senderId: string, roomId: RoomId, timestamp: Date) {
    this.apply(new UserSentMessageEvent(content, senderId, roomId, timestamp));
  }
  createRoom(roomName: string, userIds: string[]) {
    this.apply(new UserCreatedRoomEvent(this.id, roomName, userIds));
  }
  inviteUserToRoom(inviteeId: UserId, roomId: RoomId) {
    this.apply(new UserInvitedToRoomEvent(this.id, inviteeId, roomId));
  }
  leaveRoom(roomId: RoomId) {
    this.apply(new UserLeftRoomEvent(this.id, roomId));
  }
  closedRoom(userId: UserId, roomId: RoomId, timestamp: Date) {
    this.apply(new UserClosedRoomEvent(userId, roomId, timestamp));
  }
  // createsEvent(){

  // }
  // modifiesEvent() {

  // }
}
