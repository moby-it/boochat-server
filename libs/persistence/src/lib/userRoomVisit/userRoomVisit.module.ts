import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserRoomVisit, UserRoomVisitSchema } from "./userRoomVisit.schema";
@Module({
  imports: [MongooseModule.forFeature([{ name: UserRoomVisit.name, schema: UserRoomVisitSchema }])],
  exports: [MongooseModule]
})
export class UserRoomVisitPersistenceModule {

}
