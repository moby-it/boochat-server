import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessagePersistenceService, MessagesPersistenceModule, RoomsPersistenceModule, RoomsPersistenceService } from './chat';
import { UserRoomVisitPersistenceModule, UserRoomVisitPersistenceService } from './userRoomVisit';
import { UserPersistenceModule, UserPersistenceService } from './users';

@Module({
  imports: [MongooseModule.forRoot(process.env.CONNECTION_STRING || "mongodb://gspanos:sinpassword@localhost", {
    dbName: 'OurSocial'
  }),
    UserPersistenceModule,
    MessagesPersistenceModule,
    RoomsPersistenceModule,
    UserRoomVisitPersistenceModule
  ],
  providers: [UserPersistenceService, MessagePersistenceService, RoomsPersistenceService, UserRoomVisitPersistenceService],
  exports: [UserPersistenceService, RoomsPersistenceService, MessagePersistenceService, UserRoomVisitPersistenceService]
})
export class PersistenceModule { }
