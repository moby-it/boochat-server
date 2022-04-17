import { InvitedToRoomWsEventHandler } from './invited-to-room.ws-event-handler';
import { LeftRoomWsEventHandler } from './left-room.ws-event-handler';
import { MeetupCreatedWsEventHandler } from './meetup-created.ws-event-handler';
import { RoomItemSentWsEventHandler } from './message-sent.ws-event-handler';
import { PollClosedWsEventHandler } from './poll-closed.ws-event-handler';
import { PollCreatedWsEventHandler } from './poll-created.ws-event-hander';
import { PollVoteWsEventHandler } from './poll-vote.ws-event-handler';
import { RoomCreatedWsEventHandler } from './room-created.ws-event-handler';
import { RsvpChangedWsEventHandler } from './rsvp-changed.ws-event-handler';
import { UserConnectedWsEventHandler } from './user-connected.ws-event-handlers';

export const WebsocketEventHandlers = [
  UserConnectedWsEventHandler,
  InvitedToRoomWsEventHandler,
  RoomItemSentWsEventHandler,
  RoomCreatedWsEventHandler,
  LeftRoomWsEventHandler,
  MeetupCreatedWsEventHandler,
  RsvpChangedWsEventHandler,
  PollCreatedWsEventHandler,
  PollVoteWsEventHandler,
  PollClosedWsEventHandler
];
