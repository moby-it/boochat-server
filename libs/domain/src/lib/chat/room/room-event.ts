import { BaseEvent } from "../../common";

export interface CreateRoomEventDto extends BaseEvent {
  roomName: string;
  userIds: string[];
}
