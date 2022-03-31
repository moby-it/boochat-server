import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MeetupEventStoreModule, MeetupEventStoreService } from './meetup-events-store';
import { RoomsEventStoreModule, RoomEventsStoreService } from './rooms-events-store';
import { UserPersistenceModule, UserPersistenceService } from './users';

@Module({
  imports: [MongooseModule.forRoot(process.env.DBSERVER_URL || "mongodb://gspanos:sinpassword@localhost", {
    dbName: 'OurSocial'
  }),
    UserPersistenceModule,
    RoomsEventStoreModule,
    MeetupEventStoreModule
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
