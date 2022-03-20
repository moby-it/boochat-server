import { Types } from 'mongoose';
export const findByUserIdQuery = (userId: string) => [
  {
    $match: {
      users: new Types.ObjectId(userId)
    }
  },
  {
    $lookup: {
      from: 'eventlogs',
      let: { id: "$_id" },
      pipeline: [
        {
          $match: {
            $and:
              [{ $expr: { $eq: ["$$id", "$payload.room"] } },
              { $expr: { $eq: [new Types.ObjectId(userId), "$user"] } },
              ]

          }
        }
      ],
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
    $match: {
      lastMessage: { $ne: null }
    }
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
