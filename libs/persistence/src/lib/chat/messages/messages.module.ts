import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DbMessage, MessageSchema } from "./message.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: DbMessage.name, schema: MessageSchema }])],
  exports: [MongooseModule]
})
export class MessagesPersistenceModule { }
