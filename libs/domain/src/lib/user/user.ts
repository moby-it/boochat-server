import { SerializeOptions } from '@nestjs/common';
import { Expose } from 'class-transformer';
import { AggregateRootEntity, Guard, RoomId, UserId } from '../common';
import {
  UserInvitedToRoomEvent,
  UserLeftRoomEvent,
  UserSentMessageEvent,
  UserClosedRoomEvent,
  UserConnectedEvent,
  UserDisconnectedEvent,
  UserCreatedMeetupEvent,
  UserChangedRsvpEvent,
  UserCreatedPollEvent
} from '../events';
import { UserCastPollVoteEvent } from '../events/user-cast-poll-vote.event';
import { Rsvp } from '../meetups/rsvp.enum';
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
  cameOnline() {
    this.apply(new UserConnectedEvent(this));
  }
  cameOffline() {
    this.apply(new UserDisconnectedEvent(this));
  }
  sendsMessage(content: string, senderId: string, roomId: RoomId, timestamp: Date) {
    this.apply(new UserSentMessageEvent(content, senderId, roomId, timestamp));
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
  createMeetup(name: string, attendeeIds: string[], takesPlaceOn: Date) {
    this.apply(new UserCreatedMeetupEvent(this.id, name, attendeeIds, takesPlaceOn));
  }
  changeRsvp(meetupId: string, rsvp: Rsvp) {
    this.apply(new UserChangedRsvpEvent(this.id, meetupId, rsvp));
  }
  createPoll(meetupId: string, description: string, pollChoices: string[]) {
    this.apply(new UserCreatedPollEvent(this.id, meetupId, description, pollChoices));
  }
  voteOnPoll(pollId: string, pollChoiceIndex: number) {
    this.apply(new UserCastPollVoteEvent(this.id, pollId, pollChoiceIndex));
  }
}
