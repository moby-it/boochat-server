import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { EventsStoreService } from "../common/events-store.service";
import { RoomEventDocument, ROOM_EVENTS_COLLECTION_NAME } from "./room-events.schema";

@Injectable()
export class RoomEventsStoreService extends EventsStoreService<RoomEventDocument> {
  constructor(@InjectModel(ROOM_EVENTS_COLLECTION_NAME) protected override storeModel: Model<RoomEventDocument>) {
    super();
  }

}
