import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { RoomEventsController } from './room-events.controller';
import { RoomController } from './room.controller';
import { RoomGateway } from './rooms.gateway';

@Module({
  controllers: [RoomEventsController, RoomController],
  imports: [CqrsModule],
  providers: [RoomGateway]
})
export class RoomModule {}
