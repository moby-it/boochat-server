import { BaseEvent, UserId } from '../common';
import { MeetupEventEnum } from '../meetup';

export class UserCreatedMeetupEvent extends BaseEvent {
  type: number;
  createdAt: Date;
  constructor(
    public readonly userId: string,
    public readonly name: string,
    public readonly attendeeIds: UserId[],
    public readonly location: string,
    public readonly organizerId: string,
    public readonly takesPlaceOn: Date,
    public readonly imageUrl: string,
    public readonly roomId: string
  ) {
    super();
    this.type = MeetupEventEnum.MEETUP_CREATED;
    this.createdAt = new Date();
  }
}
