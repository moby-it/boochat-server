import { BaseEvent } from "../../common";

export interface RoomEvent extends BaseEvent {
  roomName: string;
  userIds: string[];
}
