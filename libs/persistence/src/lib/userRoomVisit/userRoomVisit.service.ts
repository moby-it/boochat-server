import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Result } from "@oursocial/domain";
import { Model, Types } from 'mongoose';
import { UserRoomVisit, UserRoomVisitDocument } from "./userRoomVisit.schema";
@Injectable()
export class UserRoomVisitPersistenceService {
  constructor(@InjectModel(UserRoomVisit.name) private model: Model<UserRoomVisitDocument>) { }
  async logVisit(roomId: string, userId: string, timestamp: Date): Promise<Result> {
    try {
      if (roomId || userId) throw new Error('Cannot log visit with no roomId or userId');
      const userRoomVisit = new this.model({
        _id: new Types.ObjectId(),
        room: new Types.ObjectId(roomId),
        user: new Types.ObjectId(userId),
        timestamp
      });
      await userRoomVisit.save();
      return Result.success();
    } catch (e) {
      return Result.fail(e);
    }

  }
  async getLastVisitsByUserId(userId: string): Promise<UserRoomVisitDocument[]> {
    return await this.model.find({ user: new Types.ObjectId(userId) }).exec();
  }
}
