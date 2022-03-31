import { BaseEvent } from "../../common";

export interface CreateMessageEvent extends BaseEvent {
  senderId: string;
  roomId: string;
  dateSent: Date;
  content: string;
}
