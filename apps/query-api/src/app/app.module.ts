import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApplicationEventsController } from './application-events.controller';
@Module({
  imports: [ConfigModule],
  controllers: [ApplicationEventsController]
})
export class AppModule {}
