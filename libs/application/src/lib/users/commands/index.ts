import { AddUserToStoreCommandHandler } from "./add-user-to-store.command";
import { RemoveUserFromStoreCommandHandler } from "./remove-user-from-store.command";

export const ActiveUsersCommandHandlers = [
  AddUserToStoreCommandHandler,
  RemoveUserFromStoreCommandHandler
];
