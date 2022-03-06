import { Module } from '@nestjs/common';
import { ActiveUsersGateway } from "./active-users.gateway";
import { AppController } from './app.controller';
import { MessageGateway } from './message.gateway';


@Module({
  controllers: [AppController],
  providers: [ActiveUsersGateway, MessageGateway],
})
export class AppModule {
}
