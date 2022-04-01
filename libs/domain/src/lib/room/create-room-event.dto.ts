export interface CreateRoomEventDto {
  readonly userId: string;
  readonly roomName: string;
  readonly userIds: string[];
}
