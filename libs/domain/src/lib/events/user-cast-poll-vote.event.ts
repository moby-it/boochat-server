import { BaseEvent } from '../common';
import { MeetupEventEnum } from '../meetup';

export class UserCastPollVoteEvent extends BaseEvent {
  type: number;
  createdAt: Date;
  constructor(
    public readonly userId: string,
    public readonly pollId: string,
    public readonly pollChoiceIndex: number
  ) {
    super();
    this.type = MeetupEventEnum.USER_VOTED_ON_POLL;
    this.createdAt = new Date();
  }
}
