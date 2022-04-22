import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EVENTS_STORE_DB_CONNECTION_NAME, EVENTS_STORE_DB_NAME, EVENT_STORE_SERVER_URL } from './common';
import { MeetupEventStoreModule, MeetupEventStoreService } from './meetup-events-store';
import { RoomEventsStoreService, RoomsEventStoreModule } from './rooms-events-store';
import { UserEventsStoreService, UsersEventStoreModule } from './user-events-store';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRoot(process.env[EVENT_STORE_SERVER_URL] as string, {
      connectionName: EVENTS_STORE_DB_CONNECTION_NAME,
      dbName: process.env[EVENTS_STORE_DB_NAME]
    }),
    RoomsEventStoreModule,
    MeetupEventStoreModule,
    UsersEventStoreModule
  ],
  providers: [RoomEventsStoreService, MeetupEventStoreService, UserEventsStoreService],
  exports: [RoomEventsStoreService, MeetupEventStoreService, UserEventsStoreService]
})
export class PersistenceEventStoreModule {}
