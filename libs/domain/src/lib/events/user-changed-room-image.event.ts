import { BaseEvent, RoomId } from '../common';
import { MeetupEventEnum } from '../meetup';

export class UserChangedRoomImageEvent extends BaseEvent {
  type: number;
  createdAt: Date;
  constructor(
    public readonly userId: string,
    public readonly roomId: RoomId,
    public readonly imageUrl: string
  ) {
    super();
    this.type = MeetupEventEnum.USER_CHANGED_ROOM_IMAGE;
    this.createdAt = new Date();
  }
}
