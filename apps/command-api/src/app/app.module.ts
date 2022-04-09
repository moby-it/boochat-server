import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule } from '@nestjs/config';
import { ApplicationModule } from '@boochat/application';
import { ActiveUsersGateway } from './active-users';
import { AuthController } from './auth/auth.controller';
import { MessageGateway } from './message';
import { RoomsGateway } from './rooms';
import { MeetupsGateway } from './meetups/meetups.gateway';
import { PersistenceEventStoreModule } from '@boochat/persistence/events-store';
import { PersistenceSharedDbModule } from '@boochat/persistence/shared-db';

const Gateways = [ActiveUsersGateway, MessageGateway, RoomsGateway, MeetupsGateway];

@Module({
  controllers: [AuthController],
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CqrsModule,
    ApplicationModule,
    PersistenceSharedDbModule,
    PersistenceEventStoreModule
  ],
  providers: [...Gateways]
})
export class AppModule {}
