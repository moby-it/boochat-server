import { AlertDto } from '../alerts';
import { PollDto } from '../poll';

export interface MeetupDto {
  id: string;
  name: string;
  attendeeIds: string[];
  location: string;
  organizerId: string;
  takesPlaceOn: Date;
  roomId: string;
  polls: PollDto[];
  alerts: Array<AlertDto & Record<string, unknown>>;
}
