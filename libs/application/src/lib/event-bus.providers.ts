import { ConfigService } from "@nestjs/config";
import { ClientProxyFactory, Transport } from "@nestjs/microservices";
import { ROOMS_EVENTS_QUEUE, MEETUPS_EVENTS_QUEUE } from "./event-bus/event-bus.constants";

export const RoomEventBusProvider = {
  provide: ROOMS_EVENTS_QUEUE,
  useFactory: (configService: ConfigService) => {
    const roomEventQueueName = configService.get('ROOM_EVENTS_QUEUE');
    const eventBusUrl = configService.get('RABBITMQ_URL');
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [eventBusUrl],
        queue: roomEventQueueName,
        queueOptions: {
          durable: true
        }
      }
    });
  },
  inject: [ConfigService],
};
export const MeetupEventBusProvider = {
  provide: MEETUPS_EVENTS_QUEUE,
  useFactory: (configService: ConfigService) => {
    const meetupEventQueueName = configService.get('MEETUPS_EVENTS_QUEUE');
    const eventBusUrl = configService.get('RABBITMQ_URL');
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [eventBusUrl],
        queue: meetupEventQueueName,
        queueOptions: {
          durable: true
        }
      }
    });
  },
  inject: [ConfigService],
};
