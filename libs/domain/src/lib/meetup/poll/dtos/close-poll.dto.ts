import { MeetupId, PollId, UserId } from '../../../common';

export interface ClosePollDto {
  readonly userId: UserId;
  readonly meetupId: MeetupId;
  readonly pollId: PollId;
}
