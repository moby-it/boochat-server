import { Expose } from 'class-transformer';
import { Entity, Guard } from '../common';
import { Message } from './message';
import { User } from '../user';
import { RoomAnnouncement } from './room-announcement';
import { RoomItem } from './room-item';
interface RoomProps {
  name: string;
  participants: Partial<User>[] & Pick<User, 'id'>[];
  items: RoomItem[];
  imageUrl: string;
}
export class Room extends Entity<RoomProps> {
  @Expose()
  get id() {
    return this._id;
  }
  @Expose()
  get name() {
    return this._props.name;
  }
  get messages() {
    return this._props.items.filter((item) => item instanceof Message) as Message[];
  }
  get annoucements() {
    return this._props.items.filter((item) => item instanceof RoomAnnouncement) as RoomAnnouncement[];
  }
  @Expose()
  get items() {
    return this._props.items;
  }
  @Expose()
  get participants() {
    return this._props.participants;
  }
  @Expose()
  get imageUrl() {
    return this._props.imageUrl;
  }

  private constructor(props: RoomProps, id: string) {
    super(props, id);
  }
  public static create(props: RoomProps, id: string) {
    Guard.AgainstNullOrUndefined([{ propName: 'name', value: props.name }]);
    Guard.AgainstEmptyArray({ propName: 'participants', value: props.participants });
    return new Room(props, id);
  }
}
