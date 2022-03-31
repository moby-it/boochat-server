import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PersistenceModule } from '@oursocial/persistence';
import { MEETUPS_EVENTS_QUEUE, ROOMS_EVENTS_QUEUE } from './event-bus/event-bus.constants';
import { EventBusService } from './event-bus/event-bus.service';
import { CreateRoomEventHandler } from './rooms/event-handlers/create-room.event-handler';
import { ActiveUserQueryHandlers } from './users';
@Module({
  imports: [
    CqrsModule,
    ClientsModule.register([
      {
        name: ROOMS_EVENTS_QUEUE,
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:9000'],
          queue: 'room_events',
          queueOptions: {
            durable: true
          }
        }
      },
      {
        name: MEETUPS_EVENTS_QUEUE,
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:9000'],
          queue: 'meetup_events',
          queueOptions: {
            durable: true
          }
        }
      },

    ]),
    PersistenceModule,
    // ...RoomEventHandlers,

  ],
  providers: [
    ...ActiveUserQueryHandlers,
    EventBusService,
    CreateRoomEventHandler
  ],
  exports: [],
})
export class ApplicationModule { }
