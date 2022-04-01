import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { PersistenceModule } from '@boochat/persistence';
import { ApplicationEventBusProvider, MeetupEventBusProvider, RoomEventBusProvider } from './event-bus.providers';
import { EventBusService } from './event-bus/event-bus.service';
import { RoomEventHandlers } from './rooms/event-handlers';
import { ActiveUserQueryHandlers } from './users';
import { MeetupEventHandlers } from './meetups';

@Module({
  imports: [CqrsModule, ConfigModule, PersistenceModule],
  providers: [
    RoomEventBusProvider,
    MeetupEventBusProvider,
    ApplicationEventBusProvider,
    EventBusService,
    ...ActiveUserQueryHandlers,
    ...RoomEventHandlers,
    ...MeetupEventHandlers
  ],
  exports: []
})
export class ApplicationModule {}
