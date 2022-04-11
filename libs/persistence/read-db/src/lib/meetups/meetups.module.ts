import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { READ_DB_CONNECTION_NAME } from '../common';
import { Meetup, MeetupSchema } from './meetup.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Meetup.name, schema: MeetupSchema }], READ_DB_CONNECTION_NAME)]
})
export class MeetupModule {}
