import { Rsvp, GoogleId } from '@boochat/domain';

export interface Attendance {
  userId: GoogleId;
  rsvp: Rsvp;
}
