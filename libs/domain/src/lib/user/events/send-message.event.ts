import { IEvent } from "@nestjs/cqrs";
import { RoomId, UserId } from "../../common";

export class SendMessageEvent implements IEvent {
  constructor(public readonly content: string, public readonly senderId: UserId, public readonly roomId: RoomId, public readonly timestamp: Date) { }
}
