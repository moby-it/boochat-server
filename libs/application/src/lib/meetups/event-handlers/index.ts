import { MeetupCreatedEventHandler } from './meetup-created.event-handler';
import { PollVoteEventHandler } from './poll-vote.event-handler';
import { RsvpChangedEventHandler } from './rsvp-changed.event-handler';
import { PollCreatedEventHandler } from './poll-created.event-handler';
import { PollClosedEventHandler } from './poll-closed.event-handler';

export const MeetupEventHandlers = [
  MeetupCreatedEventHandler,
  RsvpChangedEventHandler,
  PollCreatedEventHandler,
  PollVoteEventHandler,
  PollClosedEventHandler
];
