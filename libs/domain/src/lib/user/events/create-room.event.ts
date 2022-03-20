import { IEvent } from "@nestjs/cqrs";
import { Server } from "socket.io";

export class CreateRoomEvent implements IEvent {
  constructor(public readonly name: string, public readonly userIds: string[], public readonly server: Server) { }
}
