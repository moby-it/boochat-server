import { BaseEvent } from "../../common";

export interface MessageEvent extends BaseEvent {
  senderId: string;
  roomId: string;
  dateSent: Date;
  content: string;
}
