import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MeetupEventsController } from './meetup-events.controller';

@Module({
  controllers: [MeetupEventsController],
  imports: [CqrsModule],
  providers: []
})
export class MeetupModule {}
