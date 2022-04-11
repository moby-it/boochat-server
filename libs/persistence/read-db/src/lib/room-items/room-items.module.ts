import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { READ_DB_CONNECTION_NAME } from '../common';
import { RoomItem, RoomItemSchema } from './room-item.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: RoomItem.name, schema: RoomItemSchema }], READ_DB_CONNECTION_NAME)
  ]
})
export class RoomItemModule {}
