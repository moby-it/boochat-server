import { CreateRoomEventHandler } from './create-room.event-handler';
import { InviteUserToRoomEventHandler } from './invite-user-to-room.event-handler';
import { MessageSentEventHandler } from './message-sent.event-handler';
import { UserClosedRoomEventHandler } from './user-closed-room.event-handler';
import { UserLeftRoomEventHandler } from './user-left-room.event-handler';

export const RoomEventHandlers = [
  CreateRoomEventHandler,
  InviteUserToRoomEventHandler,
  MessageSentEventHandler,
  UserClosedRoomEventHandler,
  UserLeftRoomEventHandler
];
