import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EVENTS_STORE_DB_CONNECTION_NAME, SHARED_DB_CONNECTION_NAME } from './common';
import { MeetupEventStoreModule, MeetupEventStoreService } from './meetup-events-store';
import { RoomEventsStoreService, RoomsEventStoreModule } from './rooms-events-store';
import { UserPersistenceModule, UserPersistenceService } from './users';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRoot(process.env['DBSERVER_URL'] as string, {
      connectionName: EVENTS_STORE_DB_CONNECTION_NAME,
      dbName: process.env['EVENTS_STORE_DB_NAME']
    }),
    MongooseModule.forRoot(process.env['DBSERVER_URL'] as string, {
      connectionName: SHARED_DB_CONNECTION_NAME,
      dbName: process.env['SHARED_DB_NAME']
    }),
    UserPersistenceModule,
    RoomsEventStoreModule,
    MeetupEventStoreModule
  ],
  providers: [UserPersistenceService, RoomEventsStoreService, MeetupEventStoreService],
  exports: [UserPersistenceService, RoomEventsStoreService, MeetupEventStoreService]
})
export class PersistenceModule {}
