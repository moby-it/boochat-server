import { BaseEvent } from '../common';
import { MeetupEventEnum } from '../meetups';

export class UserCreatedMeetupEvent extends BaseEvent {
  type: number;
  createdAt: Date;
  constructor(
    public readonly userId: string,
    public readonly name: string,
    public readonly attendees: string[],
    public readonly location: string,
    public readonly organizerId: string,
    public readonly takesPlaceOn: Date,
    public readonly roomId: string
  ) {
    super();
    this.type = MeetupEventEnum.MEETUP_CREATED;
    this.createdAt = new Date();
  }
}
