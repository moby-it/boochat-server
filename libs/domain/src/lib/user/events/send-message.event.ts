import { RoomEventEnum } from '../../chat';
import { BaseEvent, RoomId, UserId } from '../../common';

export class SendMessageEvent implements BaseEvent {
  type: number;
  name: string;
  userId: string;
  createdAt: Date;
  constructor(
    public readonly content: string,
    public readonly senderId: UserId,
    public readonly roomId: RoomId,
    public readonly timestamp: Date
  ) {
    this.type = RoomEventEnum.USER_SENT_MESSAGE;
    this.name = RoomEventEnum[RoomEventEnum.USER_SENT_MESSAGE];
    this.userId = senderId;
    this.createdAt = timestamp;
  }
}
