import { Types } from 'mongoose';
export const findByUserIdQuery = (userId: string) => [
  {
    $match: {
      users: new Types.ObjectId(userId)
    }
  },
  {
    $lookup: {
      from: 'userroomvisits',
      localField: '_id',
      foreignField: 'room',
      as: 'lastVisits'
    }
  },
  {
    $lookup: {
      from: 'messages',
      localField: '_id',
      foreignField: 'room',
      as: 'messages'
    }
  },
  {
    $project: {
      name: 1,
      lastMessage: {
        $first: {
          $filter: {
            input: "$messages",
            cond: { $eq: ["$$this.createdAt", { $max: "$messages.createdAt" }] }
          }
        }
      },
      unreadMessages: {
        $size: {
          $filter: {
            input: "$messages",
            cond: { $gt: ["$$this.createdAt", { $max: "$lastVisits.timestamp" }] }
          }
        }
      },
      users: 1
    },
  },
  {
    $project: {
      _id: 0,
      id: { $toString: "$_id" },
      name: 1,
      lastMessage: {
        id: {
          $toString: "$lastMessage._id"
        },
        content: 1,
        senderId: {
          $toString: "$lastMessage.sender"
        },
        roomId: {
          $toString: "$lastMessage.room"
        },
        createdAt: 1
      },
      unreadMessages: 1,
      userIds: []
    }
  }
];
