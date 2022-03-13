import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { PersistenceModule } from '@oursocial/persistence';
import { ActiveUsersGateway } from "./active-users/active-users.gateway";
import { ActiveUsersStore } from './active-users/active-users.store';
import { ActiveUsersCommandHandlers } from './active-users/commands';
import { AuthController } from './auth/auth.controller';
import { ChatCommandHandlers, MessageGateway, RoomsController } from './chat';
import { RoomsGateway } from './chat/rooms/rooms.gateway';

const CommandHandlers = [...ActiveUsersCommandHandlers, ...ChatCommandHandlers];
const Gateways = [ActiveUsersGateway, MessageGateway, RoomsGateway];
@Module({
  controllers: [AuthController, RoomsController],
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.chat.env'],
    }),
    PersistenceModule,
    CqrsModule
  ],
  providers: [
    ...Gateways,
    ...CommandHandlers
  ],
})
export class AppModule {
}
