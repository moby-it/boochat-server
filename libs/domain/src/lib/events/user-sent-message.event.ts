import { RoomEventEnum } from '../room';
import { BaseEvent, RoomId, UserId } from '../common';

export class UserSentMessageEvent extends BaseEvent {
  type: number;
  userId: string;
  createdAt: Date;
  constructor(public readonly content: string, public readonly senderId: UserId, public readonly roomId: RoomId) {
    super();
    this.type = RoomEventEnum.USER_SENT_MESSAGE;
    this.userId = senderId;
    this.createdAt = new Date();
  }
}
