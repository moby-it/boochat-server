import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PersistenceModule } from '@oursocial/persistence';
import { ActiveUsersGateway } from "./active-users/active-users.gateway";
import { MessageGateway } from './message/message.gateway';
import { AuthController } from './auth/auth.controller';


@Module({
  controllers: [AuthController],
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.chat.env'],
    }),
    PersistenceModule
  ],
  providers: [ActiveUsersGateway, MessageGateway],
})
export class AppModule {
}
