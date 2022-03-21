import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomsPersistenceModule, RoomsPersistenceService, MessagePersistenceService, MessagesPersistenceModule } from './chat';
import { EventLogPersistenceModule, EventLogPersistenceService } from './event-log';
import { MeetupsPersistenceModule, MeetupPersistenceService } from './meetups';
import { ActiveUsersStore, UserPersistenceModule, UserPersistenceService } from './users';

@Module({
  imports: [MongooseModule.forRoot(process.env.DBSERVER_URL || "mongodb://gspanos:sinpassword@localhost", {
    dbName: 'OurSocial'
  }),
    UserPersistenceModule,
    MessagesPersistenceModule,
    RoomsPersistenceModule,
    EventLogPersistenceModule,
    MeetupsPersistenceModule
  ],
  providers: [UserPersistenceService, MessagePersistenceService, RoomsPersistenceService, EventLogPersistenceService, MeetupPersistenceService, ActiveUsersStore],
  exports: [UserPersistenceService, RoomsPersistenceService, MessagePersistenceService, EventLogPersistenceService, MeetupPersistenceService, ActiveUsersStore]
})
export class PersistenceModule { }
