import { GetRoomsWithLastItemQueryHandler } from './get-room-list.query';
import { GetRoomWithItemsQueryHandler } from './get-room.query';
export * from './get-room-list.query';
export * from './get-room.query';
export const RoomQueryHandlers = [GetRoomsWithLastItemQueryHandler, GetRoomWithItemsQueryHandler];
