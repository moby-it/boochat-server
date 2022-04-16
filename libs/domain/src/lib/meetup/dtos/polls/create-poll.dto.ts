import { UserId } from '../../../common';
import { PollTypeEnum } from '../../poll';

export interface CreatePollDto {
  readonly _id: string;
  readonly pollType: PollTypeEnum;
  readonly userId: string;
  readonly participantIds: UserId[];
  readonly description: string;
  readonly pollChoices: string[];
  readonly meetupId: string;
}
