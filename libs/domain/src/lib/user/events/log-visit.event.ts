import { IEvent } from "@nestjs/cqrs";
import { RoomId, UserId } from "../../common";

export class LogVisitEvent implements IEvent {
  constructor(public readonly roomId: RoomId, public readonly userId: UserId, public readonly timestamp: Date) { }
}
