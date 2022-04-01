import { BaseEvent } from '../common';
import { MeetupEventEnum } from '../meetups';
import { Rsvp } from '../meetups/rsvp.enum';

export class UserChangedRsvpEvent implements BaseEvent {
  type: number;
  createdAt: Date;
  constructor(public readonly userId: string, public readonly rsvp: Rsvp) {
    this.type = MeetupEventEnum.USER_CHANGED_RSVP;
    this.createdAt = new Date();
  }
}
