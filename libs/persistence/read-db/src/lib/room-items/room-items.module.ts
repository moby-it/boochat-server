import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { READ_DB_CONNECTION_NAME } from '../common';
import { RoomItem, RoomItemSchema, ROOM_ITEM_COLLECTION_NAME } from './room-item.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: RoomItem.name, schema: RoomItemSchema, collection: ROOM_ITEM_COLLECTION_NAME }],
      READ_DB_CONNECTION_NAME
    )
  ]
})
export class RoomItemModule {}
