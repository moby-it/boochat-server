import { GoogleId } from '@boochat/domain';
import { PipelineStage } from 'mongoose';
export const findByUserIdQuery: (userId: GoogleId) => PipelineStage[] = (userId: string) => [
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
      lastItems: {
        $filter: {
          input: '$roomItems',
          cond: { $eq: ['$$this.createdAt', { $max: '$roomItems.createdAt' }] }
        }
      },
      participantIds: 1,
      imageUrl: 1,
      lastVisits: 1
    }
  },
  {
    $project: {
      _id: 1,
      name: 1,
      lastItem: { $arrayElemAt: ['$lastItems', 0] },
      participantIds: 1,
      imageUrl: 1,
      lastVisits: {
        $arrayElemAt: [
          {
            $filter: {
              input: '$lastVisits',
              cond: { $eq: ['$$this.userId', userId] }
            }
          },
          0
        ]
      }
    }
  },
  {
    $project: {
      _id: 1,
      name: 1,
      lastMessage: 1,
      participantIds: 1,
      imageUrl: 1,
      lastItem: 1,
      isUnread: {
        $cond: {
          if: '$lastVisit',
          then: { $lt: [{ $toDate: '$lastVisit.timestamp' }, '$lastItem.createdAt'] },
          else: true
        }
      }
    }
  },
  {
    $sort: {
      'lastItem.createdAt': -1
    }
  }
];
