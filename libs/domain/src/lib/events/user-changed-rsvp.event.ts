import { BaseEvent } from '../common';
import { MeetupEventEnum } from '../meetup';
import { Rsvp } from '../meetup/rsvp.enum';

export class UserChangedRsvpEvent extends BaseEvent {
  type: number;
  createdAt: Date;
  constructor(public readonly userId: string, public readonly meetupId: string, public readonly rsvp: Rsvp) {
    super();
    this.type = MeetupEventEnum.USER_CHANGED_RSVP;
    this.createdAt = new Date();
  }
}
