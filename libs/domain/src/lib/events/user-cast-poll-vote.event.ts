import { BaseEvent } from '../common';
import { MeetupEventEnum } from '../meetups';

export class UserCastPollVoteEvent implements BaseEvent {
  type: number;
  createdAt: Date;
  constructor(public readonly userId: string, public readonly pollId: string, public readonly pollChoiceIndex: number) {
    this.type = MeetupEventEnum.USER_VOTED_ON_POLL;
    this.createdAt = new Date();
  }
}
