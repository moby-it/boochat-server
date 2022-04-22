import { ActiveUsersModule, AuthModule } from '@boochat/application';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { RoomEventsController } from './room-events.controller';
import { RoomController } from './room.controller';

@Module({
  controllers: [RoomEventsController, RoomController],
  imports: [CqrsModule, AuthModule, ActiveUsersModule],
  providers: []
})
export class RoomModule {}
