import { MeetupCreatedEventHandler } from './meetup-created.event-handler';
import { VoteOnPollEventHandler } from './vote-on-poll.event-handler';
import { RsvpChangedEventHandler } from './rsvp-changed.event-handler';
import { PollCreatedEventHandler } from './poll-created.event-handler';

export const MeetupEventHandlers = [
  MeetupCreatedEventHandler,
  RsvpChangedEventHandler,
  PollCreatedEventHandler,
  VoteOnPollEventHandler
];
