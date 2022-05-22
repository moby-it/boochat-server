import { BaseEvent, RoomId } from '../common';
import { MeetupEventEnum } from '../meetup';

export class MeetupImageChangedEvent extends BaseEvent {
  type: number;
  createdAt: Date;

  constructor(
    public readonly userId: string,
    public readonly roomId: RoomId,
    public readonly imageUrl: string
  ) {
    super();
    this.type = MeetupEventEnum.USER_CHANGED_MEETUP_IMAGE;
    this.createdAt = new Date();
  }
}
