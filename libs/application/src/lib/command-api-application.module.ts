import { PersistenceEventStoreModule } from '@boochat/persistence/events-store';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { MeetupEventBusProvider, RoomEventBusProvider, UserEventBusProvider } from './event-bus.providers';
import { EventBusService } from './event-bus/event-bus.service';
import { Mapper } from './mapper';
import { MeetupCommandHandlers } from './meetups';
import { RoomCommandHandlers } from './rooms';
import { AuthModule, UserCommandHandlers } from './users';

@Module({
  imports: [CqrsModule, ConfigModule, PersistenceEventStoreModule, AuthModule],
  providers: [
    RoomEventBusProvider,
    MeetupEventBusProvider,
    UserEventBusProvider,
    EventBusService,
    ...RoomCommandHandlers,
    ...MeetupCommandHandlers,
    ...UserCommandHandlers,
    Mapper
  ],
  exports: []
})
export class CommandApplicationModule {}
