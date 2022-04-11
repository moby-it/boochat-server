import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { READ_DB_CONNECTION_NAME } from '../common';
import { Room, RoomSchema } from './room.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }], READ_DB_CONNECTION_NAME)]
})
export class RoomModule {}
