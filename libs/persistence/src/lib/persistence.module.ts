import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessagesPersistenceModule } from './messages/messages.module';
import { RoomsPersistenceModule } from './rooms/room.module';
import { RoomsPersistenceService } from './rooms/room.service';
import { UserPersistenceModule } from './users/user.module';
import { UserPersistenceService } from './users/user.service';

@Module({
  imports: [MongooseModule.forRoot(process.env.CONNECTION_STRING || "mongodb://gspanos:sinpassword@localhost", {
    dbName: 'OurSocial'
  }),
    UserPersistenceModule,
    MessagesPersistenceModule,
    RoomsPersistenceModule
  ],
  providers: [UserPersistenceService, MessageChannel, RoomsPersistenceService],
  exports: [UserPersistenceService, MessageChannel, RoomsPersistenceService]
})
export class PersistenceModule { }