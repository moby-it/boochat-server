export interface CreateRoomDto {
  readonly userId: string;
  readonly roomName: string;
  readonly userIds: string[];
}
