import { QueryApplicationModule } from '@boochat/application';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { MeetupModule } from './meetups';
import { NotificationsGateway } from './notifications';
import { RoomModule } from './rooms';
import { UserModule } from './users/users.module';
@Module({
  imports: [
    CqrsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    MeetupModule,
    RoomModule,
    QueryApplicationModule
  ],
  controllers: [],
  providers: [NotificationsGateway]
})
export class AppModule {}
