import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ActiveUsersGateway } from "./active-users/active-users.gateway";
import { AppController } from './app.controller';
import { MessageGateway } from './message/message.gateway';
import { PersistenceModule } from "@oursocial/persistence";


@Module({
  controllers: [AppController],
  imports: [ConfigModule.forRoot({
    envFilePath: ['.chat.env']
  }),
    PersistenceModule
  ],
  providers: [ActiveUsersGateway, MessageGateway],
})
export class AppModule {
}
