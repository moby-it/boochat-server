import { Expose } from 'class-transformer';
import { ValueObject } from '../common';

interface RoomAnnouncementProps {
  content: string;
  timestamp: Date;
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
