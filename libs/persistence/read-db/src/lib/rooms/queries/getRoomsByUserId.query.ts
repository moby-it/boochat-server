export const findByUserIdQuery = (userId: string) => [
  {
    $match: {
      participantIds: userId
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
      lastItem: {
        $first: {
          $filter: {
            input: '$roomItems',
            cond: { $eq: ['$$this.createdAt', { $max: '$roomItems.createdAt' }] }
          }
        }
      },
      participants: 1,
      imageUrl: 1,
      lastVisits: 1
    }
  },
  {
    $project: {
      _id: 1,
      name: 1,
      lastItem: 1,
      participants: 1,
      imageUrl: 1,
      lastVisit: {
        $first: {
          $filter: {
            input: '$lastVisits',
            cond: { $eq: ['$$this.userId', userId] }
          }
        }
      }
    }
  },
  {
    $project: {
      _id: 1,
      name: 1,
      lastMessage: 1,
      participants: 1,
      imageUrl: 1,
      lastItem: 1,
      hasUnreadMessage: {
        $cond: {
          if: '$lastVisit',
          then: { $lt: ['$lastVisit.timestamp', '$lastItem.createdAt'] },
          else: true
        }
      }
    }
  }
];
