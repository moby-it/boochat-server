import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Meetup, MeetupSchema} from "./meetup.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: Meetup.name, schema: MeetupSchema }])],
  exports: [MongooseModule]
})
export class MeetupsPersistenceModule { }
