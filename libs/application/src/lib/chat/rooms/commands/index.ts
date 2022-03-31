import { AddUserToRoomCommandHandler } from "./add-user-to-room.command";
import { CreateRoomCommandHandler } from "./create-room.command";
import { DisconnectUsersFromRoomCommandHandler } from "./disconnect-users-from-room.command";
import { RemoveUserFromRoomCommandHandler } from "./remove-user-from-room.command";
import { SaveUserLastRoomVisitCommandHandler } from "./save-user-last-room-visit.command";

export * from "./add-user-to-room.command";
export * from "./create-room.command";
export * from "./disconnect-users-from-room.command";
export * from "./remove-user-from-room.command";
export * from "./save-user-last-room-visit.command";
export const RoomCommandHandlers = [
  AddUserToRoomCommandHandler,
  CreateRoomCommandHandler,
  DisconnectUsersFromRoomCommandHandler,
  RemoveUserFromRoomCommandHandler,
  SaveUserLastRoomVisitCommandHandler
];
