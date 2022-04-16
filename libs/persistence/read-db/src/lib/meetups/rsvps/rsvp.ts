import { Rsvp, UserId } from '@boochat/domain';

export interface Attendance {
  userId: UserId;
  rsvp: Rsvp;
}
