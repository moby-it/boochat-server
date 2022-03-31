import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { RoomEventSchema, ROOM_EVENTS_COLLECTION_NAME } from "./room-events.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: ROOM_EVENTS_COLLECTION_NAME, schema: RoomEventSchema }])],
  exports: [MongooseModule]
})
export class RoomsEventStoreModule {

}
