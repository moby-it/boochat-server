import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { CreateRoomDto } from "./room.dto";
import { Room, RoomDocument } from "./room.schema";

@Injectable()
export class RoomsPersistenceService {
  constructor(@InjectModel(Room.name) private roomsModel: Model<RoomDocument>) { }
  async findOne(_id: string): Promise<Room> {
    return await this.roomsModel.findOne({ _id }).exec();
  }
  async createRoom(createRoomDto: CreateRoomDto): Promise<Room> {
    const createdRoom = new this.roomsModel(createRoomDto);
    return createdRoom.save();
  }
  async findByUserId(userId: string): Promise<Room[]> {
    return await this.roomsModel.find({ _id: userId }).exec();
  }
  async findAll(): Promise<Room[]> {
    return this.roomsModel.find().exec();
  }
}
