import { BaseEvent, MeetupEventEnum, RoomEventEnum } from '@boochat/domain';
import { Inject, Injectable } from '@nestjs/common';
import { ClientRMQ } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { MEETUP_EVENTS_QUEUE, ROOM_EVENTS_QUEUE } from './event-bus.constants';

@Injectable()
export class EventBusService {
  constructor(
    @Inject(ROOM_EVENTS_QUEUE) private roomClient: ClientRMQ,
    @Inject(MEETUP_EVENTS_QUEUE) private meetupClient: ClientRMQ
  ) {}
  async emitRoomEvent(event: BaseEvent) {
    await firstValueFrom(this.roomClient.emit(RoomEventEnum[event.type], event));
  }
  async emitMeetupEvent(event: BaseEvent) {
    await firstValueFrom(this.meetupClient.emit(MeetupEventEnum[event.type], event));
  }
}
