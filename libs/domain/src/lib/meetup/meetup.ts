import { Expose } from 'class-transformer';
import { Room } from '../room';
import { AggregateRootEntity } from '../common';
import { User } from '../user';
import { Poll } from './poll';
import { Alert } from './meetup-alert';
import { MeetupDto } from './dtos';
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
export class Meetup extends AggregateRootEntity<MeetupProps> {
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
}
