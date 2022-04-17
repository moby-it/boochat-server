import { MeetupId, PollId } from '../../../common';

export interface ClosePollDto {
  readonly meetupId: MeetupId;
  readonly pollId: PollId;
}
