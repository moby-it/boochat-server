import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DbRoom, RoomSchema } from "./room.schema";

@Module({
    imports: [MongooseModule.forFeature([{ name: DbRoom.name, schema: RoomSchema }])],
    exports: [MongooseModule]
})
export class RoomsPersistenceModule {

}
