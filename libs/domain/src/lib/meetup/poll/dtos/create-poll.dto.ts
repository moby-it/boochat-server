import { PollTypeEnum } from '..';
import { GoogleId } from '../../../common';

export interface CreatePollDto {
  readonly _id: string;
  readonly userId: GoogleId;
  readonly pollType: PollTypeEnum;
  readonly participantIds: GoogleId[];
  readonly description: string;
  readonly pollChoices: string[];
  readonly meetupId: string;
}
