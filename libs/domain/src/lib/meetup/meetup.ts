import { Expose } from 'class-transformer';
import { Entity, PollId, GoogleId } from '../common';
import { Room } from '../room';
import { User } from '../user';
import { Alert } from './alerts';
import { Poll } from './poll';
interface MeetupProps {
  name: string;
  organizer: Partial<User> & Pick<User, 'id'>;
  location: string;
  attendants: Array<Partial<User> & Pick<User, 'id'>>;
  takesPlaceOn: Date;
  room: Partial<Room> & Pick<Room, 'id'>;
  polls: Poll[];
  alerts: Alert[];
}
export class Meetup extends Entity<MeetupProps> {
  @Expose()
  get id() {
    return this._id;
  }
  @Expose()
  get name(): string {
    return this._props.name;
  }
  @Expose()
  get organizer() {
    return this._props.organizer;
  }
  @Expose()
  get attendants() {
    return this._props.attendants;
  }
  @Expose()
  get takesPlaceOn() {
    return this._props.takesPlaceOn;
  }
  @Expose()
  get room() {
    return this._props.room;
  }
  @Expose()
  get location() {
    return this._props.location;
  }
  @Expose()
  get polls() {
    return this._props.polls;
  }
  private constructor(props: MeetupProps, id: string) {
    super(props, id);
  }
  public static create(props: MeetupProps, id: string) {
    return new Meetup(props, id);
  }
  shouldClosePoll(pollId: PollId) {
    const poll = this.polls.find((p) => p.id === pollId);
    if (!poll) throw new Error('failed to check if poll should close');
    return poll.everyoneHasVoted;
  }
  pollIsActive(pollId: PollId) {
    const poll = this.polls.find((p) => p.id === pollId);
    if (!poll) throw new Error('failed to check if poll should close');
    return poll.isActive;
  }
  userHasVotedOnPoll(userId: GoogleId, pollId: PollId) {
    const poll = this.polls.find((p) => p.id === pollId);
    if (!poll) throw new Error('failed to check if poll should close');
    return poll.userHasVoted(userId);
  }
}
