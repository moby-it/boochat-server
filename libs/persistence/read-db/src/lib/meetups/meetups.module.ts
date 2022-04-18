import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { READ_DB_CONNECTION_NAME } from '../common';
import { Meetup, MeetupSchema, MEETUP_COLLECTION_NAME } from './meetup.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Meetup.name, schema: MeetupSchema, collection: MEETUP_COLLECTION_NAME }], READ_DB_CONNECTION_NAME)
  ]
})
export class MeetupModule {}
