export interface CreateRoomDto {
  readonly name: string;
  readonly imageUrl: string;
  readonly participantIds: string[];
}
