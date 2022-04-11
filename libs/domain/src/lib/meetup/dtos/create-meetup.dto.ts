export interface CreateMeetupDto {
  name: string;
  attendeeIds: string[];
  location: string;
  organizerId: string;
  takesPlaceOn: Date;
  roomId: string;
}
