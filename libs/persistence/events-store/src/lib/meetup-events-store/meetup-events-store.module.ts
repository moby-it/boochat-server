import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EVENTS_STORE_DB_CONNECTION_NAME } from '../common/variable';
import { MeetupEvent, MeetupEventSchema, MEETUP_EVENTS_COLLECTION_NAME } from './meetup-events.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: MeetupEvent.name,
          schema: MeetupEventSchema,
          collection: MEETUP_EVENTS_COLLECTION_NAME
        }
      ],
      EVENTS_STORE_DB_CONNECTION_NAME
    )
  ]
})
export class MeetupEventStoreModule {}
