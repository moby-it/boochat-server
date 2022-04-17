import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule } from '@nestjs/config';
import { AuthModule, CommandApplicationModule } from '@boochat/application';
import { AuthController } from './auth/auth.controller';
import { MessageGateway } from './message';
import { RoomsGateway } from './rooms';
import { MeetupsGateway } from './meetups/meetups.gateway';
import { AuthGateway } from './auth/auth.gateway';

const Gateways = [MessageGateway, RoomsGateway, MeetupsGateway, AuthGateway];

@Module({
  controllers: [AuthController],
  imports: [ConfigModule.forRoot({ isGlobal: true }), CqrsModule, CommandApplicationModule, AuthModule],
  providers: [...Gateways]
})
export class AppModule {}
