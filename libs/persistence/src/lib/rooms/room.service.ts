import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from 'mongoose';
import { RoomDto } from "./room.dto";
import { Room, RoomDocument } from "./room.schema";

@Injectable()
export class RoomsPersistenceService {
  constructor(@InjectModel(Room.name) private roomsModel: Model<RoomDocument>) { }
  async findOne(_id: string): Promise<Room> {
    return await this.roomsModel.findOne({ _id: new Types.ObjectId(_id) }).exec();
  }
  async createRoom(createRoomDto: RoomDto): Promise<Room> {
    const createdRoom = new this.roomsModel({
      ...createRoomDto, users: createRoomDto
        .users.map(id => new Types.ObjectId(id)),
      _id: new Types.ObjectId()
    });
    return createdRoom.save();
  }
  async findByUserId(userId: string): Promise<Room[]> {
    return await this.roomsModel.find({ users: new Types.ObjectId(userId) }).exec();
  }
  async findAll(): Promise<Room[]> {
    return this.roomsModel.find().exec();
  }
}
