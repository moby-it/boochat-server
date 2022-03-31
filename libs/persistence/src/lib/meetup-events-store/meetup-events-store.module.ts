import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MeetupEventSchema, MEETUP_EVENTS_COLLECTION_NAME } from "./meetup-events.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: MEETUP_EVENTS_COLLECTION_NAME, schema: MeetupEventSchema }])],
  exports: [MongooseModule]
})
export class MeetupEventStoreModule {

}
