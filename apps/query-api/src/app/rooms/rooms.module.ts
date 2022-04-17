import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { RoomEventsController } from './room-events.controller';
import { RoomController } from './room.controller';

@Module({
  controllers: [RoomEventsController, RoomController],
  imports: [CqrsModule],
  providers: []
})
export class RoomModule {}
