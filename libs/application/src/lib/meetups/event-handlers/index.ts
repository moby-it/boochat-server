import { MeetupCreatedEventHandler } from './meetup-created.event-handler';
import { UserCastVoteOnPollEventHandler } from './user-cast-vote-on-poll.event-handler';
import { UserChangedRsvpEventHandler } from './user-changed-rsvp.event-handler';
import { UserCreatedPollEventHandler } from './user-created-poll.event-handler';

export const MeetupEventHandlers = [
  MeetupCreatedEventHandler,
  UserChangedRsvpEventHandler,
  UserCreatedPollEventHandler,
  UserCastVoteOnPollEventHandler
];
