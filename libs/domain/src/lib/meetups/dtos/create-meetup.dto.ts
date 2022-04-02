export interface CreateMeetupDto {
  name: string;
  attendeeIds: string[];
  organizerId: string;
  takesPlaceOn: Date;
}
