import { BaseEvent } from '../common';
import { MeetupEventEnum } from '../meetups';

export class UserCreatedPollEvent extends BaseEvent {
  type: number;
  createdAt: Date;
  constructor(
    public readonly userId: string,
    public readonly meetupId: string,
    public readonly description: string,
    public readonly pollChoices: string[]
  ) {
    super();
    this.type = MeetupEventEnum.USER_CREATED_POLL;
    this.createdAt = new Date();
  }
}
