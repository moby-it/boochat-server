import { RoomId } from '@boochat/domain';

export const findRoomByIdQuery = (roomId: RoomId) => [
  {
    $match: {
      _id: roomId
    }
  },
  {
    $lookup: {
      from: 'RoomItems',
      localField: '_id',
      foreignField: 'roomId',
      as: 'items'
    }
  }
];
