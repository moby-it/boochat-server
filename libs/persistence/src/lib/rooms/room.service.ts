import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from 'mongoose';
import { RoomDto } from "./room.dto";
import { Room, RoomDocument } from "./room.schema";

@Injectable()
export class RoomsPersistenceService {
  constructor(@InjectModel(Room.name) private roomsModel: Model<RoomDocument>) { }
  async findOne(_id: string): Promise<RoomDocument> {
    return await this.roomsModel.findOne({ _id: new Types.ObjectId(_id) }).exec();
  }
  async createRoom(createRoomDto: RoomDto): Promise<RoomDocument> {
    const createdRoom = new this.roomsModel({
      ...createRoomDto, users: createRoomDto
        .userIds.map(id => new Types.ObjectId(id))
    });
    return createdRoom.save();
  }
  async findByUserId(userId: string): Promise<RoomDocument[]> {
    return await this.roomsModel.find({ users: new Types.ObjectId(userId) }).exec();
  }
  async findAll(): Promise<RoomDocument[]> {
    return this.roomsModel.find().exec();
  }
}
