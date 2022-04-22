import { BaseEvent, GoogleId } from '../common';
import { MeetupEventEnum } from '../meetup';

export class MeetupCreatedEvent extends BaseEvent {
  type: number;
  createdAt: Date;
  constructor(
    public readonly userId: string,
    public readonly name: string,
    public readonly attendeeIds: GoogleId[],
    public readonly location: string,
    public readonly organizerId: string,
    public readonly takesPlaceOn: Date,
    public readonly imageUrl: string,
    public readonly roomId: string
  ) {
    super();
    this.type = MeetupEventEnum.MEETUP_CREATED;
    this.createdAt = new Date();
  }
}
