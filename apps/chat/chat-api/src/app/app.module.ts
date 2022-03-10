import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PersistenceModule } from '@oursocial/persistence';
import { ActiveUsersGateway } from "./active-users/active-users.gateway";
import { ActiveUsersService } from './active-users/active-users.service';
import { AuthController } from './auth/auth.controller';
import { MessageGateway } from './message/message.gateway';
import { RoomsController } from './rooms/rooms.controller';


@Module({
  controllers: [AuthController, RoomsController],
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.chat.env'],
    }),
    PersistenceModule
  ],
  providers: [ActiveUsersGateway, MessageGateway, ActiveUsersService],
})
export class AppModule {
}
