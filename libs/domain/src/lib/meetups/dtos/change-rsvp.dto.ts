import { Rsvp } from '../rsvp.enum';

export interface ChangeRsvpDto {
  userId: string;
  rsvp: Rsvp;
  meetupId: string;
}
