import { MeetupId, GoogleId } from '../../../common';
import { PollStatusEnum, PollTypeEnum } from '..';
import { PollVoteDto } from './poll-vote.dto';

export interface PollDto {
  id: string;
  participantIds: string[];
  type: PollTypeEnum;
  status: PollStatusEnum;
  votes: PollVoteDto[];
  creatorId: GoogleId;
  meetupId: MeetupId;
  dateCreated: Date;
  description: string;
  pollChoices: string[];
}
