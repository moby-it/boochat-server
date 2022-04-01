import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MeetupEventStoreModule, MeetupEventStoreService } from './meetup-events-store';
import { RoomsEventStoreModule, RoomEventsStoreService } from './rooms-events-store';
import { UserPersistenceModule, UserPersistenceService } from './users';

@Module({
  imports: [
    ConfigModule,
    UserPersistenceModule,
    RoomsEventStoreModule,
    MeetupEventStoreModule,
    MongooseModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        uri: config.get('DBSERVER_URL'),
        dbName: 'Boochat'
      }),
      inject: [ConfigService]
    }),
  ],
  providers: [
    UserPersistenceService,
    RoomEventsStoreService,
    MeetupEventStoreService
  ],
  exports: [
    UserPersistenceService,
    RoomEventsStoreService,
    MeetupEventStoreService
  ]
})
export class PersistenceModule { }
