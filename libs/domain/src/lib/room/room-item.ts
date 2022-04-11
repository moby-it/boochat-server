import { Message } from './message';
import { RoomAnnouncement } from './room-announcement';

export enum RoomItemEnum {
  Message,
  Announcement
}
export type RoomItem = Message | RoomAnnouncement;
