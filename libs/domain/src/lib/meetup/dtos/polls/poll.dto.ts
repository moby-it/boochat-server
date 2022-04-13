import { MeetupId, UserId } from '../../../common';
import { PollStatusEnum, PollTypeEnum } from '../../poll';
import { PollVoteDto } from './poll-vote.dto';

export interface PollDto {
  id: string;
  participantIds: string[];
  type: PollTypeEnum;
  status: PollStatusEnum;
  votes: PollVoteDto[];
  creatorId: UserId;
  meetupId: MeetupId;
  dateCreated: Date;
  description: string;
  pollChoices: string[];
}
