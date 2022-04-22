import { RoomId, GoogleId } from '../../common';

export interface CreateMeetupDto {
  readonly _id: string;
  readonly name: string;
  readonly attendeeIds: string[];
  readonly location: string;
  readonly organizerId: GoogleId;
  readonly takesPlaceOn: Date;
  readonly imageUrl: string;
  readonly roomId: RoomId;
}
