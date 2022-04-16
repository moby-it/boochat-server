import { Message } from './message';
import { RoomAnnouncement } from './room-announcement';

export enum RoomItemEnum {
  Message,
  Announcement
}
export type RoomItem = Message | RoomAnnouncement;

export function isMessage(roomItem: RoomItem): roomItem is Message {
  return (roomItem as Message).sender !== undefined || roomItem instanceof Message;
}
