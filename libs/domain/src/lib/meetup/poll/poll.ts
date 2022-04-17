import { Entity, MeetupId, UserId } from '../../common';
import { PollVote } from './vote';
export enum PollTypeEnum {
  GENERIC_POLL,
  RESCHEDULE_POLL,
  RELOCATE_POLL
}
export enum PollStatusEnum {
  CLOSED,
  ACTIVE
}
interface PollProps {
  readonly participantIds: UserId[];
  readonly type: PollTypeEnum;
  readonly status: PollStatusEnum;
  readonly votes: PollVote[];
  readonly creatorId: UserId;
  readonly meetupId: MeetupId;
  readonly dateCreated: Date;
  readonly description: string;
  readonly pollChoices: string[];
}
export class Poll extends Entity<PollProps> {
  private constructor(props: PollProps, id: string) {
    super(props, id);
  }
  static create(props: PollProps, id: string) {
    return new Poll(props, id);
  }
  get id() {
    return this._id;
  }
  public get isActive() {
    return this._props.status === PollStatusEnum.ACTIVE;
  }
  get everyoneHasVoted() {
    return this._props.votes.length === this._props.participantIds.length;
  }
}
