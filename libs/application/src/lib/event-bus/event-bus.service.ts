import { BaseEvent, MeetupEventEnum, RoomEventEnum, UserEventEnum } from '@boochat/domain';
import { Inject, Injectable } from '@nestjs/common';
import { ClientRMQ } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { MEETUP_EVENTS_QUEUE, ROOM_EVENTS_QUEUE, USER_EVENTS_QUEUE } from './event-bus.constants';

@Injectable()
export class EventBusService {
  constructor(
    @Inject(ROOM_EVENTS_QUEUE) private roomEventsClient: ClientRMQ,
    @Inject(MEETUP_EVENTS_QUEUE) private meetupEventsClient: ClientRMQ,
    @Inject(USER_EVENTS_QUEUE) private userEventsClient: ClientRMQ
  ) {}
  async emitRoomEvent(event: BaseEvent) {
    await firstValueFrom(this.roomEventsClient.emit(RoomEventEnum[event.type], event));
  }
  async emitMeetupEvent(event: BaseEvent) {
    await firstValueFrom(this.meetupEventsClient.emit(MeetupEventEnum[event.type], event));
  }
  async emitUserEvent(event: BaseEvent) {
    await firstValueFrom(this.userEventsClient.emit(UserEventEnum[event.type], event));
  }
}
