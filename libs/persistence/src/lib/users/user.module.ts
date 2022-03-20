import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DbUser, UserSchema } from "./user.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: DbUser.name, schema: UserSchema }])],
  exports: [MongooseModule]
})
export class UserPersistenceModule {

}
