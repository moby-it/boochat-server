import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessagePersistenceService, MessagesPersistenceModule, RoomsPersistenceModule, RoomsPersistenceService } from './chat';
import { UserPersistenceModule, UserPersistenceService } from './users';

@Module({
  imports: [MongooseModule.forRoot(process.env.CONNECTION_STRING || "mongodb://gspanos:sinpassword@localhost", {
    dbName: 'OurSocial'
  }),
    UserPersistenceModule,
    MessagesPersistenceModule,
    RoomsPersistenceModule
  ],
  providers: [UserPersistenceService, MessagePersistenceService, RoomsPersistenceService],
  exports: [UserPersistenceService, RoomsPersistenceService, MessagePersistenceService]
})
export class PersistenceModule { }
