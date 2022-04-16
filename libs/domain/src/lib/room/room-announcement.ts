import { Expose } from 'class-transformer';
import { RoomId, ValueObject } from '../common';

interface RoomAnnouncementProps {
  content: string;
  timestamp: Date;
  roomId: RoomId;
}
export class RoomAnnouncement extends ValueObject<RoomAnnouncementProps> {
  constructor(props: RoomAnnouncementProps) {
    super(props);
  }
  @Expose()
  public get content() {
    return this._props.content;
  }
  @Expose()
  public get timestamp() {
    return this._props.timestamp;
  }
}
