import { GoogleId } from '../../common';
import { Rsvp } from '../rsvp.enum';

export interface ChangeRsvpDto {
  userId: GoogleId;
  rsvp: Rsvp;
  meetupId: string;
}
