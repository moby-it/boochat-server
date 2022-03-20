import { Socket } from "socket.io";
import { User } from "../user";

export class UserDisconnectedEvent {
  constructor(public readonly user: User, public readonly socket: Socket) { }
}
