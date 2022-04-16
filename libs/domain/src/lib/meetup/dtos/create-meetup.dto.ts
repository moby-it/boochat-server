import { RoomId, UserId } from '../../common';

export interface CreateMeetupDto {
  readonly _id: string;
  readonly name: string;
  readonly attendeeIds: string[];
  readonly location: string;
  readonly organizerId: UserId;
  readonly takesPlaceOn: Date;
  readonly imageUrl: string;
  readonly roomId: RoomId;
}
