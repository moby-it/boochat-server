import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { READ_DB_CONNECTION_NAME } from '../common';
import { Room, RoomSchema, ROOM_COLLECTION_NAME } from './room.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Room.name, schema: RoomSchema, collection: ROOM_COLLECTION_NAME }],
      READ_DB_CONNECTION_NAME
    )
  ]
})
export class RoomModule {}
