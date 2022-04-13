import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MeetupEventsController } from './meetup-events.controller';
import { MeetupController } from './meetup.controller';
import { MeetupsGateway } from './meetups.gateway';

@Module({
  controllers: [MeetupEventsController, MeetupController],
  imports: [CqrsModule],
  providers: [MeetupsGateway]
})
export class MeetupModule {}
