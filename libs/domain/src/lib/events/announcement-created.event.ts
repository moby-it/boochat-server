import { BaseEvent, RoomId, UserId } from '../common';
import { RoomEventEnum } from '../room';

export class AnnouncementCreatedEvent extends BaseEvent {
  type: number;
  createdAt: Date;

  constructor(public readonly content: string, public readonly roomId: RoomId, public readonly userId: UserId) {
    super();
    this.type = RoomEventEnum.ANNOUNCEMENT_CREATED;
    this.createdAt = new Date();
  }
}
