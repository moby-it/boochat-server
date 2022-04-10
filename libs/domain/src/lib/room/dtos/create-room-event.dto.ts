export interface CreateRoomDto {
  readonly userId: string;
  readonly roomName: string;
  readonly imageUrl: string;
  readonly userIds: string[];
}
