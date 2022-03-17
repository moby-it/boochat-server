import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Result, RoomId, UserId } from "@oursocial/domain";
import { Model, Types } from 'mongoose';
import { RoomDto } from "./room.dto";
import { Room, RoomDocument, RoomDocumentWithLastMessage } from "./room.schema";

@Injectable()
export class RoomsPersistenceService {
  constructor(@InjectModel(Room.name) private roomsModel: Model<RoomDocument>) { }
  async findOne(_id: RoomId): Promise<RoomDocument | null> {
    return await this.roomsModel.findOne({ _id: new Types.ObjectId(_id) }).exec();
  }
  async createRoom(createRoomDto: RoomDto): Promise<RoomDocument> {
    const createdRoom = new this.roomsModel({
      _id: new Types.ObjectId(),
      ...createRoomDto, users: createRoomDto
        .userIds.map(id => new Types.ObjectId(id))
    });
    return createdRoom.save();
  }
  async findByUserId(userId: UserId): Promise<RoomDocumentWithLastMessage[]> {
    const _rooms = await this.roomsModel.aggregate<RoomDocumentWithLastMessage>([
      {
        $match: { users: new Types.ObjectId(userId) }
      },
      {
        $lookup: {
          from: 'messages',
          localField: '_id',
          foreignField: 'room',
          as: 'messages',
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
        $unwind: {
          path: "$lastVisits",
          preserveNullAndEmptyArrays: true
        }
      },
      { $sort: { "lastVisits.timestamp": -1 } },
      { $group: { "_id": "$_id", "name": { $first: "$name" }, messages: { $first: "$messages" }, "lastVisit": { $first: "$lastVisits" } } },
    ]);
    const rooms = await this.roomsModel.aggregate<RoomDocumentWithLastMessage>([
      {
        $match: { users: new Types.ObjectId(userId) }
      },
      {
        $lookup: {
          from: 'messages',
          localField: '_id',
          foreignField: 'room',
          as: 'messages',
        }
      },
      { $unwind: '$messages' },

      { $sort: { "messages.createdAt": -1 } },
      { $limit: 1 },
      {
        $addFields: {
          lastMessage: "$messages",
          unreadMessages: ""
        }
      },
      {
        $project: {
          messages: 0
        }
      }
    ]);
    return rooms;

  }
  async findAll(): Promise<RoomDocument[]> {
    return this.roomsModel.find().exec();
  }
  async addUserToRoom(userId: UserId, roomId: RoomId): Promise<Result> {
    try {
      const dbRoom = await this.roomsModel.findOne({ _id: new Types.ObjectId(roomId) });
      if (!dbRoom) return Result.fail('Room not found');
      await dbRoom.updateOne({
        $push: {
          users: new Types.ObjectId(userId)
        }
      }).exec();
      return Result.success();
    } catch (e) {
      console.error(e);
      return Result.fail(e);
    }

  }
  async removeUserFromRoom(userId: UserId, roomId: RoomId) {
    try {
      const dbRoom = await this.roomsModel.findOne({ _id: new Types.ObjectId(roomId) });
      if (!dbRoom) return Result.fail('Room not found');
      await dbRoom.updateOne({
        $pull: {
          users: new Types.ObjectId(userId)
        }
      }).exec();
      return Result.success();
    } catch (e) {
      console.error(e);
      return Result.fail(e);
    }
  }
}
