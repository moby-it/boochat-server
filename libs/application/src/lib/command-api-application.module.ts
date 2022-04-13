import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import {
  ApplicationEventBusProvider,
  MeetupEventBusProvider,
  RoomEventBusProvider
} from './event-bus.providers';
import { EventBusService } from './event-bus/event-bus.service';
import { RoomEventHandlers } from './rooms/event-handlers';
import { UserQueryHandlers, UserEventHandlers } from './users';
import { MeetupEventHandlers } from './meetups';
import { PersistenceEventStoreModule } from '@boochat/persistence/events-store';
import { PersistenceSharedDbModule } from '@boochat/persistence/shared-db';
import { AuthService } from './users/auth.service';

@Module({
  imports: [CqrsModule, ConfigModule, PersistenceEventStoreModule, PersistenceSharedDbModule],
  providers: [
    RoomEventBusProvider,
    MeetupEventBusProvider,
    ApplicationEventBusProvider,
    EventBusService,
    ...UserQueryHandlers,
    ...RoomEventHandlers,
    ...MeetupEventHandlers,
    ...UserEventHandlers,
    AuthService
  ],
  exports: [AuthService]
})
export class CommandApplicationModule {}
