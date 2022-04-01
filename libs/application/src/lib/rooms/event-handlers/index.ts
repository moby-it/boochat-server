import { UserCreatedRoomEventHandler } from './user-created-room.event-handler';
import { UserInvitedToRoomEventHandler } from './user-invited-to-room.event-handler';
import { UserSentMessageEventHandler } from './user-sent-message.event-handler';
import { UserClosedRoomEventHandler } from './user-closed-room.event-handler';
import { UserLeftRoomEventHandler } from './user-left-room.event-handler';

export const RoomEventHandlers = [
  UserCreatedRoomEventHandler,
  UserInvitedToRoomEventHandler,
  UserSentMessageEventHandler,
  UserClosedRoomEventHandler,
  UserLeftRoomEventHandler
];