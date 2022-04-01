import { BaseEvent } from '@boochat/domain';
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
  async sendRoomEvent(event: BaseEvent) {
    await firstValueFrom(this.roomClient.emit(event.name, event));
  }
  async sendMeetupEvent(event: BaseEvent) {
    await firstValueFrom(this.meetupClient.emit(event.name, event));
  }
}
