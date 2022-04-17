import { PollTypeEnum } from '..';
import { UserId } from '../../../common';

export interface CreatePollDto {
  readonly _id: string;
  readonly userId: UserId;
  readonly pollType: PollTypeEnum;
  readonly participantIds: UserId[];
  readonly description: string;
  readonly pollChoices: string[];
  readonly meetupId: string;
}
