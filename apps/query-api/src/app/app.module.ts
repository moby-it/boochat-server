import { Module } from '@nestjs/common';
import { ApplicationEventsController } from './application-events.controller';
@Module({
  imports: [],
  controllers: [ApplicationEventsController]
})
export class AppModule {}
