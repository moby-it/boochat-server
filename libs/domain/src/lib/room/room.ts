import { Expose } from 'class-transformer';
import { Entity, Guard } from '../common';
import { Message } from '../message';
import { User } from '../user';
import { RoomAlert, RoomAlertStatus } from './room-alert';
import { RoomAnnouncement } from './room-announcement';
interface RoomProps {
  name: string;
  users: Partial<User>[] & Pick<User, 'id'>[];
  items: Array<Message | RoomAnnouncement>;
  alerts: RoomAlert[];
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
  get users() {
    return this._props.users;
  }
  @Expose()
  get imageUrl() {
    return this._props.imageUrl;
  }
  get activeAlerts() {
    return this._props.alerts.filter((alert) => alert.status === RoomAlertStatus.ACTIVE);
  }

  private constructor(props: RoomProps, id: string) {
    super(props, id);
  }
  public static create(props: RoomProps, id: string) {
    Guard.AgainstNullOrUndefined([{ propName: 'name', value: props.name }]);
    return new Room(props, id);
  }
}
