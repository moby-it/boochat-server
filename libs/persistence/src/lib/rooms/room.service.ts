import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { User } from "../users/user.schema";
import { CreateRoomDto } from "./room.dto";
import { Room, RoomDocument } from "./room.schema";

@Injectable()
export class RoomsPersistenceService {
    constructor(@InjectModel(Room.name) private roomsModel: Model<RoomDocument>) { }
    async exists(_id: string) {
        return await this.roomsModel.exists({ _id }).exec();
    }
    async createRoom(createRoomDto: CreateRoomDto): Promise<Room> {
        const createdRoom = new this.roomsModel(createRoomDto);
        return createdRoom.save();
    }
    async findByUser(user: User): Promise<Room[]> {
        return await this.roomsModel.find({ "users._id": { "$eq": user._id } }).exec();
    }
    async findAll(): Promise<Room[]> {
        return this.roomsModel.find().exec();
    }
}