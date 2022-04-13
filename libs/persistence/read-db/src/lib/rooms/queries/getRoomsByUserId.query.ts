export const findByUserIdQuery = (userId: string) => [
  {
    $match: {
      participants: [userId]
    }
  },
  {
    $lookup: {
      from: 'RoomItems',
      localField: '_id',
      foreignField: 'roomId',
      as: 'roomItems'
    }
  },
  {
    $project: {
      _id: 1,
      name: 1,
      lastMessage: {
        $first: {
          $filter: {
            input: '$roomItems',
            cond: { $eq: ['$$this.createdAt', { $max: '$roomItems.createdAt' }] }
          }
        }
      },
      participants: 1,
      imageUrl: 1
    }
  }
];
