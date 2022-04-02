export interface CreateMeetupDto {
  id: string;
  name: string;
  attendeeIds: string[];
  organizer: string;
  takesPlaceOn: Date;
}
