import { Expose } from "class-transformer";
import { Room } from "../chat";
import { AggregateRootEntity } from "../common";
import { User } from "../user";
interface MeetupProps {
  name: string;
  organizer: Partial<User> & Pick<User, 'id'>;
  attendants: Array<Partial<User> & Pick<User, 'id'>>;
  takesPlaceOn: Date;
  room: Partial<Room> & Pick<Room, 'id'>;
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
  private constructor(props: MeetupProps, id: string) {
    super(props, id);
  }
  public static create(props: MeetupProps, id: string) {

    return new Meetup(props, id);
  }
}
