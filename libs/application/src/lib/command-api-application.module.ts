import { PersistenceEventStoreModule } from '@boochat/persistence/events-store';
import { PersistenceSharedDbModule } from '@boochat/persistence/shared-db';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { MeetupEventBusProvider, RoomEventBusProvider } from './event-bus.providers';
import { EventBusService } from './event-bus/event-bus.service';
import { Mapper } from './mapper';
import { MeetupCommandHandlers } from './meetups';
import { RoomCommandHandlers } from './rooms';
import { UserQueryHandlers } from './users';

@Module({
  imports: [CqrsModule, ConfigModule, PersistenceEventStoreModule, PersistenceSharedDbModule],
  providers: [
    RoomEventBusProvider,
    MeetupEventBusProvider,
    EventBusService,
    ...UserQueryHandlers,
    ...RoomCommandHandlers,
    ...MeetupCommandHandlers,
    Mapper
  ],
  exports: []
})
export class CommandApplicationModule {}
