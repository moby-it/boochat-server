import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EVENTS_STORE_DB_CONNECTION_NAME } from '../common/variable';
import { RoomEvent, RoomEventSchema, ROOM_EVENTS_COLLECTION_NAME } from './room-events.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: RoomEvent.name,
          schema: RoomEventSchema,
          collection: ROOM_EVENTS_COLLECTION_NAME
        }
      ],
      EVENTS_STORE_DB_CONNECTION_NAME
    )
  ],
  exports: [MongooseModule]
})
export class RoomsEventStoreModule {}
