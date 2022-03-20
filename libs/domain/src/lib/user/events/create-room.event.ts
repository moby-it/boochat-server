import { IEvent } from "@nestjs/cqrs";

export class CreateRoomEvent implements IEvent {
  constructor(public readonly name: string, public readonly userIds: string[]) { }
}
