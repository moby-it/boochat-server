import { ConnectUsersToRoomCommandHandler } from './connect-users-to-room.command';
import { CreateMessageCommandHandler } from './create-message.command';
import { CreateRoomCommandHandler } from './create-room.command';
import { DisconnectUsersFromRoomCommandHandler } from './disconnect-users-from-room.command';
import { RemoveUserFromRoomCommandHandler } from './remove-user-from-room.command';
import { AddUserToRoomCommandHandler } from './add-user-to-room.command';
export * from './connect-users-to-room.command';
export * from './create-message.command';
export * from './create-room.command';
export * from './disconnect-users-from-room.command';
export const ChatCommandHandlers =
  [
    AddUserToRoomCommandHandler,
    RemoveUserFromRoomCommandHandler,
    ConnectUsersToRoomCommandHandler,
    CreateMessageCommandHandler,
    CreateRoomCommandHandler,
    DisconnectUsersFromRoomCommandHandler
  ];
