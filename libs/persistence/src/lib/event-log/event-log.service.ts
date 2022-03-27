import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from 'mongoose';
import { EventLog, EventLogDocument } from "./event-log.schema";
import { EventsEnum } from "./events.enum";
@Injectable()
export class EventLogPersistenceService {
  constructor(@InjectModel(EventLog.name) private model: Model<EventLogDocument>) { }
  async logVisit(roomId: string, userId: string, timestamp: Date): Promise<void> {
    if (!roomId || !userId) throw new Error('Cannot log visit with no roomId or userId');
    await this.model.updateOne(
      { room: new Types.ObjectId(roomId), user: new Types.ObjectId(userId), type: EventsEnum.USER_DISCONNECTED_FROM_ROOM },
      { timestamp },
      { upsert: true }
    );
  }
}
