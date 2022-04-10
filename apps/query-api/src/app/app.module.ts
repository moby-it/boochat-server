import { QueryApplicationModule } from '@boochat/application';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { AppEventsController } from './app-events.controller';
import { MeetupController, MeetupEventsController } from './meetups';
import { RoomController, RoomEventsController } from './rooms';
import { UserController } from './users';
@Module({
  imports: [CqrsModule, ConfigModule.forRoot({ isGlobal: true }), QueryApplicationModule],
  controllers: [
    AppEventsController,
    MeetupController,
    RoomController,
    MeetupEventsController,
    RoomEventsController,
    UserController
  ]
})
export class AppModule {}
