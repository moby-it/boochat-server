import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_SERVER_URL, EVENTS_STORE_DB_CONNECTION_NAME, EVENTS_STORE_DB_NAME } from './common';
import { MeetupEventStoreModule, MeetupEventStoreService } from './meetup-events-store';
import { RoomEventsStoreService, RoomsEventStoreModule } from './rooms-events-store';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRoot(process.env[MONGO_SERVER_URL] as string, {
      connectionName: EVENTS_STORE_DB_CONNECTION_NAME,
      dbName: process.env[EVENTS_STORE_DB_NAME]
    }),
    RoomsEventStoreModule,
    MeetupEventStoreModule
  ],
  providers: [RoomEventsStoreService, MeetupEventStoreService],
  exports: [RoomEventsStoreService, MeetupEventStoreService]
})
export class PersistenceEventStoreModule {}
