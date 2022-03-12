import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { PersistenceModule } from '@oursocial/persistence';
import { ActiveUsersGateway } from "./active-users/active-users.gateway";
import { ActiveUsersStore } from './active-users/active-users.store';
import { ActiveUsersCommandHandlers } from './active-users/commands';
import { AuthController } from './auth/auth.controller';
import { MessageCommandHandlers } from './message/commands';
import { MessageGateway } from './message/message.gateway';
import { RoomsController } from './rooms/rooms.controller';

const CommandHandlers = [...ActiveUsersCommandHandlers, ...MessageCommandHandlers];
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
    ActiveUsersGateway,
    MessageGateway,
    ActiveUsersStore,
    ...CommandHandlers
  ],
})
export class AppModule {
}
