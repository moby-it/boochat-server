import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { ApplicationEventBusProvider, MeetupEventBusProvider, RoomEventBusProvider } from './event-bus.providers';
import { EventBusService } from './event-bus/event-bus.service';
import { RoomEventHandlers } from './rooms/event-handlers';
import { ActiveUserQueryHandlers, UserEventHandlers } from './users';
import { MeetupEventHandlers } from './meetups';
import { PersistenceEventStoreModule } from '@boochat/persistence/events-store';
import { PersistenceSharedDbModule } from '@boochat/persistence/shared-db';

@Module({
  imports: [CqrsModule, ConfigModule, PersistenceEventStoreModule, PersistenceSharedDbModule],
  providers: [
    RoomEventBusProvider,
    MeetupEventBusProvider,
    ApplicationEventBusProvider,
    EventBusService,
    ...ActiveUserQueryHandlers,
    ...RoomEventHandlers,
    ...MeetupEventHandlers,
    ...UserEventHandlers
  ],
  exports: []
})
export class CommandApplicationModule {}
