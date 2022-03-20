import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DbEvent, EventSchema } from "./event.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: DbEvent.name, schema: EventSchema }])],
  exports: [MongooseModule]
})
export class EventsPersistenceModule { }
