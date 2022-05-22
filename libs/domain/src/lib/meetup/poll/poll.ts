import { Expose } from 'class-transformer';
import { Entity, MeetupId, GoogleId } from '../../common';
import { PollVote } from './poll-vote';
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
  readonly participantIds: GoogleId[];
  readonly type: PollTypeEnum;
  readonly status: PollStatusEnum;
  readonly votes: PollVote[];
  readonly creatorId: GoogleId;
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
  @Expose()
  get id() {
    return this._id;
  }
  @Expose()
  get type() {
    return this._props.type;
  }
  @Expose()
  get participantIds() {
    return this._props.participantIds;
  }
  @Expose()
  get status() {
    return this._props.status;
  }
  @Expose()
  get votes() {
    return this._props.votes;
  }
  @Expose()
  get creatorId() {
    return this._props.creatorId;
  }
  @Expose()
  get meetupId() {
    return this._props.meetupId;
  }
  @Expose()
  get createdAt() {
    return this._props.dateCreated;
  }
  @Expose()
  get description() {
    return this._props.description;
  }
  @Expose()
  get pollChoices() {
    return this._props.pollChoices;
  }
  public get isActive() {
    return this._props.status === PollStatusEnum.ACTIVE;
  }
  public userHasVoted(userId: GoogleId) {
    return this._props.votes.map((v) => v.userId).includes(userId);
  }
  get everyoneHasVoted() {
    return this._props.votes.length === this._props.participantIds.length;
  }
}
