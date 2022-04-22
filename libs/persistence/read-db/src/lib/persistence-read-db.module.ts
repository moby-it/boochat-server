import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { READ_DB_CONNECTION_NAME, READ_DB_NAME, READ_SERVER_URL } from './common';
import { MeetupModule, MeetupsRepository } from './meetups';
import { RoomItemModule, RoomItemService } from './room-items';
import { RoomModule, RoomsRepository } from './rooms';
import { UserRepository, UsersModule } from './users';
@Module({
  imports: [
    MongooseModule.forRoot(process.env[READ_SERVER_URL] as string, {
      connectionName: READ_DB_CONNECTION_NAME,
      dbName: process.env[READ_DB_NAME]
    }),
    RoomItemModule,
    RoomModule,
    MeetupModule,
    UsersModule
  ],
  providers: [RoomItemService, RoomsRepository, MeetupsRepository, UserRepository],
  exports: [RoomItemService, RoomsRepository, MeetupsRepository, UserRepository]
})
export class PersistenceReadDbModule {}
