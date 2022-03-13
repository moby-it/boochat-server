import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Result, RoomId, UserId } from "@oursocial/domain";
import { Model, Types } from 'mongoose';
import { RoomDto } from "./room.dto";
import { Room, RoomDocument } from "./room.schema";

@Injectable()
export class RoomsPersistenceService {
  constructor(@InjectModel(Room.name) private roomsModel: Model<RoomDocument>) { }
  async findOne(_id: RoomId): Promise<RoomDocument | null> {
    return await this.roomsModel.findOne({ _id: new Types.ObjectId(_id) }).exec();
  }
  async createRoom(createRoomDto: RoomDto): Promise<RoomDocument> {
    const createdRoom = new this.roomsModel({
      ...createRoomDto, users: createRoomDto
        .userIds.map(id => new Types.ObjectId(id))
    });
    return createdRoom.save();
  }
  async findByUserId(userId: UserId): Promise<RoomDocument[]> {
    return await this.roomsModel.find({ users: new Types.ObjectId(userId) }).exec();
  }
  async findAll(): Promise<RoomDocument[]> {
    return this.roomsModel.find().exec();
  }
  async addUserToRoom(userId: UserId, roomId: RoomId): Promise<Result<undefined>> {
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
