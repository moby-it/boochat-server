import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomsPersistenceModule, RoomsPersistenceService, MessagePersistenceService, MessagesPersistenceModule } from './chat';
import { EventLogPersistenceModule, EventLogPersistenceService } from './event-log';
import { EventsPersistenceModule, EventPersistenceService } from './events';
import { ActiveUsersStore, UserPersistenceModule, UserPersistenceService } from './users';

@Module({
  imports: [MongooseModule.forRoot(process.env.DBSERVER_URL || "mongodb://gspanos:sinpassword@localhost", {
    dbName: 'OurSocial'
  }),
    UserPersistenceModule,
    MessagesPersistenceModule,
    RoomsPersistenceModule,
    EventLogPersistenceModule,
    EventsPersistenceModule
  ],
  providers: [UserPersistenceService, MessagePersistenceService, RoomsPersistenceService, EventLogPersistenceService, EventPersistenceService, ActiveUsersStore],
  exports: [UserPersistenceService, RoomsPersistenceService, MessagePersistenceService, EventLogPersistenceService, EventPersistenceService, ActiveUsersStore]
})
export class PersistenceModule { }
