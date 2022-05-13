/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { MEETUP_EVENTS_QUEUE, ROOM_EVENTS_QUEUE, USER_EVENTS_QUEUE } from '@boochat/application';
import { ClassSerializerInterceptor, INestApplication, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app/app.module';
import * as firebase from 'firebase-admin';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 4444;
  //#region Middleware
  app.enableCors();
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      excludePrefixes: ['_']
    })
  );
  const config = app.get(ConfigService);
  initializeRMQ(app, config);
  initializeFirebaseAdmin(config);
  await app.startAllMicroservices();
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();
function initializeFirebaseAdmin(config: ConfigService) {
  const firebaseCredentials = JSON.parse(getMandatoryVariable(config, 'GOOGLE_APPLICATION_CREDENTIALS'));
  firebase.initializeApp({
    credential: firebase.credential.cert(firebaseCredentials)
  });
}
function getMandatoryVariable<T>(config: ConfigService, variableName: string): T {
  const configVariable = config.get(variableName);
  if (configVariable === undefined)
    throw new Error(`Cannot start application with ${variableName}=undefined`);
  return configVariable;
}
function initializeRMQ(app: INestApplication, config: ConfigService) {
  const queues = [
    getMandatoryVariable<string>(config, ROOM_EVENTS_QUEUE),
    getMandatoryVariable<string>(config, MEETUP_EVENTS_QUEUE),
    getMandatoryVariable<string>(config, USER_EVENTS_QUEUE)
  ];
  for (const queue of queues) {
    app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.RMQ,
      options: {
        urls: [getMandatoryVariable<string>(config, 'RABBITMQ_URL')],
        queue
      }
    });
  }
}
