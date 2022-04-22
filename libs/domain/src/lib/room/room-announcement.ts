import { Exclude, Expose } from 'class-transformer';
import { RoomId, ValueObject } from '../common';

interface RoomAnnouncementProps {
  id: string;
  content: string;
  timestamp: Date;
  roomId: RoomId;
}
export class RoomAnnouncement extends ValueObject<RoomAnnouncementProps> {
  constructor(props: RoomAnnouncementProps) {
    super(props);
  }
  @Expose()
  public get id() {
    return this._props.id;
  }
  @Expose()
  public get content() {
    return this._props.content;
  }
  @Expose()
  public get timestamp() {
    return this._props.timestamp;
  }
  @Exclude()
  public get roomId() {
    return this._props.roomId;
  }
}
