import { ValueObject } from '../common';

interface RoomAnnouncementProps {
  content: string;
  timestamp: Date;
}
export class RoomAnnouncement extends ValueObject<RoomAnnouncementProps> {
  constructor(props: RoomAnnouncementProps) {
    super(props);
  }
  public get content() {
    return this._props.content;
  }
  public get timestamp() {
    return this._props.timestamp;
  }
}
