import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { EventLog, EventLogSchema } from "./event-log.schema";
@Module({
  imports: [MongooseModule.forFeature([{ name: EventLog.name, schema: EventLogSchema }])],
  exports: [MongooseModule]
})
export class EventLogPersistenceModule {

}
