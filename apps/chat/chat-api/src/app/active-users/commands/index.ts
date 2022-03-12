import { AddUserToStoreCommandHandler } from "./add-user-to-store.command";
import { UserJoinsRoomCommandHandler } from "./user-joins-rooms.command";

export const ActiveUsersCommandHandlers = [
  AddUserToStoreCommandHandler,
  UserJoinsRoomCommandHandler
];
