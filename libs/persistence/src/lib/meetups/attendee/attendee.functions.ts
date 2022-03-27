import { AttendeeDto } from "../meetup.dto";
import { Types } from 'mongoose';
import { Attendee } from "./attendee.schema";
export function AttendeeDtoToAttendee(attendees: AttendeeDto[] | undefined): Attendee[] | undefined {
  if (attendees && Array.isArray(attendees) && attendees.length)
    return attendees?.map(
      attendee => ({ user: new Types.ObjectId(attendee.user), rsvp: attendee.rsvp }));
}
