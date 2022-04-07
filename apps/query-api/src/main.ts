/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { APPLICATION_EVENTS_QUEUE, MEETUP_EVENTS_QUEUE, ROOM_EVENTS_QUEUE } from '@boochat/application';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 4444;
  const config = app.get(ConfigService);
  const queues = [config.get(ROOM_EVENTS_QUEUE), config.get(MEETUP_EVENTS_QUEUE), config.get(APPLICATION_EVENTS_QUEUE)];
  for (const queue of queues) {
    app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.RMQ,
      options: {
        urls: [config.get('RABBITMQ_URL') as string],
        queue
      }
    });
  }
  await app.startAllMicroservices();
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();
