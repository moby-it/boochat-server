import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ApplicationModule } from '@oursocial/application';
import { PersistenceModule } from '@oursocial/persistence';
import { ActiveUsersGateway } from './active-users';
import { AuthController } from './auth/auth.controller';
import { MessageGateway } from './message';
import { RoomsGateway } from './rooms';

const Gateways = [ActiveUsersGateway, MessageGateway, RoomsGateway];


@Module({
  controllers: [AuthController],
  imports: [
    CqrsModule,
    ApplicationModule,
    PersistenceModule,
  ],
  providers: [
    ...Gateways,
  ],
})
export class AppModule {
}
