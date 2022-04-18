import { BaseEvent, MeetupId, PollId, UserId } from '../common';
import { MeetupEventEnum } from '../meetup';

export class PollClosedEvent extends BaseEvent {
  type: number;
  createdAt: Date;
  constructor(public readonly userId: UserId, public readonly meetupId: MeetupId, public readonly pollId: PollId) {
    super();
    this.type = MeetupEventEnum.POLL_CLOSED;
    this.createdAt = new Date();
  }
}
