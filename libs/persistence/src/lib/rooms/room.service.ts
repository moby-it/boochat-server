import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { RoomId, UserId } from "@oursocial/domain";
import { Model, Types } from 'mongoose';
import { findByUserIdQuery } from "./mongo-queries";
import { CreateRoomDto, RoomByUserIdDto, RoomDto } from "./room.dto";
import { Room, RoomDocument } from "./room.schema";

@Injectable()
export class RoomsPersistenceService {
  constructor(@InjectModel(Room.name) private roomsModel: Model<RoomDocument>) { }
  async findOne(_id: RoomId): Promise<RoomDto | undefined> {
    const dbRoom = await this.roomsModel.findOne({ _id: new Types.ObjectId(_id) }).exec();
    if (!dbRoom) return;
    return {
      name: dbRoom.name,
      userIds: dbRoom.users.map(u => u._id.toString()),
      id: dbRoom.id
    };
  }
  async createRoom(createRoomDto: CreateRoomDto): Promise<RoomDocument> {
    const createdRoom = new this.roomsModel({
      _id: new Types.ObjectId(),
      ...createRoomDto, users: createRoomDto
        .userIds.map(id => new Types.ObjectId(id))
    });
    return createdRoom.save();
  }
  async findByUserId(userId: UserId): Promise<RoomByUserIdDto[]> {
    const rooms = await this.roomsModel.aggregate<RoomByUserIdDto>(findByUserIdQuery(userId));
    return rooms;

  }
  async findAll(): Promise<RoomDto[]> {
    const dbRooms = await this.roomsModel.find().exec();
    return dbRooms.map(room => ({
      name: room.name,
      userIds: room.users.map(u => u._id.toString()),
      id: room.id
    }));
  }
  async addUserToRoom(userId: UserId, roomId: RoomId): Promise<void> {
    const dbRoom = await this.roomsModel.findOne({ _id: new Types.ObjectId(roomId) });
    if (!dbRoom) throw new Error('Room not found');
    await dbRoom.updateOne({
      $push: {
        users: new Types.ObjectId(userId)
      }
    }).exec();

  }
  async removeUserFromRoom(userId: UserId, roomId: RoomId): Promise<void> {
    const dbRoom = await this.roomsModel.findOne({ _id: new Types.ObjectId(roomId) });
    if (!dbRoom) throw new Error('Room not found');
    await dbRoom.updateOne({
      $pull: {
        users: new Types.ObjectId(userId)
      }
    }).exec();
  }
}
