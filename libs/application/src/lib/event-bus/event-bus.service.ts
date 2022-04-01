import { BaseEvent, ApplicationEventEnum, MeetupEventEnum, RoomEventEnum } from '@boochat/domain';
import { Inject, Injectable } from '@nestjs/common';
import { ClientRMQ } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { APPLICATION_EVENTS_QUEUE, MEETUP_EVENTS_QUEUE, ROOM_EVENTS_QUEUE } from './event-bus.constants';

@Injectable()
export class EventBusService {
  constructor(
    @Inject(ROOM_EVENTS_QUEUE) private roomEventsClient: ClientRMQ,
    @Inject(MEETUP_EVENTS_QUEUE) private meetupEventsClient: ClientRMQ,
    @Inject(APPLICATION_EVENTS_QUEUE) private applicationEventsClient: ClientRMQ
  ) {}
  async emitRoomEvent(event: BaseEvent) {
    await firstValueFrom(this.roomEventsClient.emit(RoomEventEnum[event.type], event));
  }
  async emitMeetupEvent(event: BaseEvent) {
    await firstValueFrom(this.meetupEventsClient.emit(MeetupEventEnum[event.type], event));
  }
  async emitApplicationEvent(event: BaseEvent) {
    await firstValueFrom(this.applicationEventsClient.emit(ApplicationEventEnum[event.type], event));
  }
}
