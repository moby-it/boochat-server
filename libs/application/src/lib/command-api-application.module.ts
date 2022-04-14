import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { MeetupEventBusProvider, RoomEventBusProvider } from './event-bus.providers';
import { EventBusService } from './event-bus/event-bus.service';
import { RoomEventHandlers } from './rooms/event-handlers';
import { UserQueryHandlers } from './users';
import { MeetupEventHandlers } from './meetups';
import { PersistenceEventStoreModule } from '@boochat/persistence/events-store';
import { PersistenceSharedDbModule } from '@boochat/persistence/shared-db';
import { AuthService } from './users/auth.service';
import { Mapper } from './mapper';

@Module({
  imports: [CqrsModule, ConfigModule, PersistenceEventStoreModule, PersistenceSharedDbModule],
  providers: [
    RoomEventBusProvider,
    MeetupEventBusProvider,
    EventBusService,
    ...UserQueryHandlers,
    ...RoomEventHandlers,
    ...MeetupEventHandlers,
    AuthService,
    Mapper
  ],
  exports: [AuthService]
})
export class CommandApplicationModule {}
