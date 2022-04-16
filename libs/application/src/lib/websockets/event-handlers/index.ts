import { InvitedToRoomWsEventHandler } from './invited-to-room.ws-event-handler';
import { RoomItemSentWsEventHandler } from './message-sent.ws-event-handler';
import { RoomCreatedWsEventHandler } from './room-created.ws-event-handler';
import { UserConnectedWsEventHandler } from './user-connected.ws-event-handlers';

export const WebsocketEventHandlers = [
  UserConnectedWsEventHandler,
  InvitedToRoomWsEventHandler,
  RoomItemSentWsEventHandler,
  RoomCreatedWsEventHandler
];
