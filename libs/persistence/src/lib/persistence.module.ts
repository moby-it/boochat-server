import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomsPersistenceModule, RoomsPersistenceService, MessagePersistenceService, MessagesPersistenceModule } from './chat';
import { EventLogPersistenceModule, EventLogPersistenceService } from './event-log';
import { UserPersistenceModule, UserPersistenceService } from './users';

@Module({
  imports: [MongooseModule.forRoot(process.env.DBSERVER_URL || "mongodb://gspanos:sinpassword@localhost", {
    dbName: 'OurSocial'
  }),
    UserPersistenceModule,
    MessagesPersistenceModule,
    RoomsPersistenceModule,
    EventLogPersistenceModule
  ],
  providers: [UserPersistenceService, MessagePersistenceService, RoomsPersistenceService, EventLogPersistenceService],
  exports: [UserPersistenceService, RoomsPersistenceService, MessagePersistenceService, EventLogPersistenceService]
})
export class PersistenceModule { }
