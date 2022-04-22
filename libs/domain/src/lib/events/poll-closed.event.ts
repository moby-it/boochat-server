import { BaseEvent, MeetupId, PollId, GoogleId } from '../common';
import { MeetupEventEnum } from '../meetup';

export class PollClosedEvent extends BaseEvent {
  type: number;
  createdAt: Date;
  constructor(
    public readonly userId: GoogleId,
    public readonly meetupId: MeetupId,
    public readonly pollId: PollId
  ) {
    super();
    this.type = MeetupEventEnum.POLL_CLOSED;
    this.createdAt = new Date();
  }
}
