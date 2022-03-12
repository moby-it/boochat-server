import { ConnectUsersToNewRoomCommandHandler } from "./connect-users-to-new-room.command";
import { CreaterMessageCommandHandler } from "./create-message.command";
import { CreateRoomCommandHandler } from "./create-room.command";
export const MessageCommandHandlers = [CreateRoomCommandHandler, ConnectUsersToNewRoomCommandHandler, CreaterMessageCommandHandler];
