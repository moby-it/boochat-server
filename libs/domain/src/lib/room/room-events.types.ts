export enum RoomEventEnum {
  ROOM_CREATED = 1,
  USER_INVITED_ROOM,
  USER_LEFT_ROOM,
  USER_CLOSED_ROOM,
  USER_SENT_MESSAGE,
  ANNOUNCEMENT_CREATED
}
export type RoomEventType = keyof typeof RoomEventEnum;
