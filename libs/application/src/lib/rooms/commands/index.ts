import { ChangeRoomImageCommandHandler } from './change-room-image.command';
import { CreateRoomCommandHandler } from './create-room.command';
import { InviteUserToRoomCommandHandler } from './invite-user-to-room.command';
import { LeaveRoomCommandHandler } from './leave-room.command';
import { SendMessageCommandHandler } from './send-message.command';
export { CreateRoomCommand } from './create-room.command';
export { ChangeRoomImageCommand } from './change-room-image.command';
export { InviteUserToRoomCommand } from './invite-user-to-room.command';
export { LeaveRoomCommand } from './leave-room.command';
export { SendMessageCommand } from './send-message.command';
export const RoomCommandHandlers = [
  CreateRoomCommandHandler,
  ChangeRoomImageCommandHandler,
  InviteUserToRoomCommandHandler,
  LeaveRoomCommandHandler,
  SendMessageCommandHandler
];
