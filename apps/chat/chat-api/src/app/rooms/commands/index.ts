import { AddUserToRoomCommandHandler } from "./add-user-to-room.command";
import { ConnectUsersToRoomCommandHandler } from "./connect-users-to-room.command";
import { CreateRoomCommandHandler } from "./create-room.command";
import { DisconnectUsersFromRoomCommandHandler } from "./disconnect-users-from-room.command";
import { RemoveUserFromRoomCommandHandler } from "./remove-user-from-room.command";
import { SaveUserLastRoomVisitCommandHandler } from "./save-user-last-room-visit.command";

export const RoomCommandHandlers = [
  AddUserToRoomCommandHandler,
  ConnectUsersToRoomCommandHandler,
  CreateRoomCommandHandler,
  DisconnectUsersFromRoomCommandHandler,
  RemoveUserFromRoomCommandHandler,
  SaveUserLastRoomVisitCommandHandler
];
