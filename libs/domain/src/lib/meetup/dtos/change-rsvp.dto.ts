import { UserId } from '../../common';
import { Rsvp } from '../rsvp.enum';

export interface ChangeRsvpDto {
  userId: UserId;
  rsvp: Rsvp;
  meetupId: string;
}
