export interface CreateRoomEventDto {
  readonly _id: string;
  readonly userId: string;
  readonly name: string;
  readonly imageUrl: string;
  readonly participantIds: string[];
}
