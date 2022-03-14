import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { PersistenceModule } from '@oursocial/persistence';
import { ActiveUsersCommandHandlers, ActiveUsersGateway, ActiveUsersStore } from './active-users';
import { AuthController } from './auth/auth.controller';
import { MessageCommandHandlers, MessageGateway } from './message';
import { RoomCommandHandlers, RoomsGateway, FindRoomByUserIdQueryHandler, FindRoomByIdQueryHandler, RoomsController } from './rooms';

const CommandHandlers = [...ActiveUsersCommandHandlers, ...RoomCommandHandlers, ...MessageCommandHandlers];
const Gateways = [ActiveUsersGateway, MessageGateway, RoomsGateway];
const QueryHandlers = [FindRoomByUserIdQueryHandler, FindRoomByIdQueryHandler];
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
    ActiveUsersStore,
    ...Gateways,
    ...CommandHandlers,
    ...QueryHandlers
  ],
})
export class AppModule {
}
