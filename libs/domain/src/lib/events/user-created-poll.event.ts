import { BaseEvent } from '../common';
import { MeetupEventEnum } from '../meetups';

export class UserCreatedPollEvent implements BaseEvent {
  type: number;
  createdAt: Date;
  constructor(
    public readonly userId: string,
    public readonly meetupId: string,
    public readonly description: string,
    public readonly pollChoices: string[]
  ) {
    this.type = MeetupEventEnum.USER_CHANGED_RSVP;
    this.createdAt = new Date();
  }
}
