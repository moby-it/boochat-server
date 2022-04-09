import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule } from '@nestjs/config';
import { CommandApiApplicationModule } from '@boochat/application';
import { ActiveUsersGateway } from './active-users';
import { AuthController } from './auth/auth.controller';
import { MessageGateway } from './message';
import { RoomsGateway } from './rooms';
import { MeetupsGateway } from './meetups/meetups.gateway';

const Gateways = [ActiveUsersGateway, MessageGateway, RoomsGateway, MeetupsGateway];

@Module({
  controllers: [AuthController],
  imports: [ConfigModule.forRoot({ isGlobal: true }), CqrsModule, CommandApiApplicationModule],
  providers: [...Gateways]
})
export class AppModule {}
