export interface CreateRoomDto {
  readonly userId: string;
  readonly name: string;
  readonly imageUrl: string;
  readonly participantIds: string[];
}
