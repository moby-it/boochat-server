import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { READ_DB_CONNECTION_NAME, READ_DB_NAME, READ_SERVER_URL } from './common';
import { MeetupModule, MeetupService, MeetupsRepository } from './meetups';
import { RoomItemService, RoomItemModule } from './room-items';
import { RoomModule, RoomService, RoomsRepository } from './rooms';
@Module({
  imports: [
    MongooseModule.forRoot(process.env[READ_SERVER_URL] as string, {
      connectionName: READ_DB_CONNECTION_NAME,
      dbName: process.env[READ_DB_NAME]
    }),
    RoomItemModule,
    RoomModule,
    MeetupModule
  ],
  providers: [RoomItemService, RoomService, RoomsRepository, MeetupsRepository, MeetupService],
  exports: [RoomItemService, RoomService, RoomsRepository, MeetupsRepository, MeetupService]
})
export class PersistenceReadDbModule {}
