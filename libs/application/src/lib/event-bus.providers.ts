import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ROOM_EVENTS_QUEUE, MEETUP_EVENTS_QUEUE, USER_EVENTS_QUEUE } from './event-bus/event-bus.constants';

export const RoomEventBusProvider = {
  provide: ROOM_EVENTS_QUEUE,
  useFactory: (configService: ConfigService) => {
    const roomEventQueueName = configService.get('ROOM_EVENTS_QUEUE');
    const eventBusUrl = configService.get('RABBITMQ_URL');
    if (!roomEventQueueName || !eventBusUrl) throw new Error(`Invalid configuration. Queue Env vars missing`);
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [eventBusUrl],
        queue: roomEventQueueName
      }
    });
  },
  inject: [ConfigService]
};
export const MeetupEventBusProvider = {
  provide: MEETUP_EVENTS_QUEUE,
  useFactory: (configService: ConfigService) => {
    const meetupEventQueueName = configService.get('MEETUP_EVENTS_QUEUE');
    const eventBusUrl = configService.get('RABBITMQ_URL');
    if (!meetupEventQueueName || !eventBusUrl)
      throw new Error(`Invalid configuration. Queue Env vars missing`);

    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [eventBusUrl],
        queue: meetupEventQueueName
      }
    });
  },
  inject: [ConfigService]
};
export const UserEventBusProvider = {
  provide: USER_EVENTS_QUEUE,
  useFactory: (configService: ConfigService) => {
    const userEventQueueName = configService.get('USER_EVENTS_QUEUE');
    const eventBusUrl = configService.get('RABBITMQ_URL');
    if (!userEventQueueName || !eventBusUrl) throw new Error(`Invalid configuration. Queue Env vars missing`);

    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [eventBusUrl],
        queue: userEventQueueName
      }
    });
  },
  inject: [ConfigService]
};
