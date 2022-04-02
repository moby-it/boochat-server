import { BaseEvent } from '../common';
import { MeetupEventEnum } from '../meetups';

export class UserCreatedMeetupEvent extends BaseEvent {
  type: number;
  createdAt: Date;
  organizer: string;
  constructor(
    public readonly userId: string,
    public readonly name: string,
    public readonly attendees: string[],
    public readonly takesPlaceOn: Date
  ) {
    super();
    this.type = MeetupEventEnum.MEETUP_CREATED;
    this.organizer = this.userId;
    this.createdAt = new Date();
  }
}
