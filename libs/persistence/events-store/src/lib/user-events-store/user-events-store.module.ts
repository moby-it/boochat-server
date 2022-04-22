import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EVENTS_STORE_DB_CONNECTION_NAME } from '../common/variable';
import { UserEvent, UserEventSchema, USER_EVENTS_COLLECTION_NAME } from './user-events.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: UserEvent.name,
          schema: UserEventSchema,
          collection: USER_EVENTS_COLLECTION_NAME
        }
      ],
      EVENTS_STORE_DB_CONNECTION_NAME
    )
  ],
  exports: [MongooseModule]
})
export class UsersEventStoreModule {}
