import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { ActiveUsersGateway } from "./active-users.gateway";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [ActiveUsersGateway],
})
export class AppModule {
}
