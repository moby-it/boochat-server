import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Room, RoomsSchema } from "./room.schema";

@Module({
    imports: [MongooseModule.forFeature([{ name: Room.name, schema: RoomsSchema }])],
    exports: [MongooseModule]
})
export class RoomsPersistenceModule {

}