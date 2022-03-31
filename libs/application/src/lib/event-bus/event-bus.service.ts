import { Inject, Injectable } from "@nestjs/common";
import { ClientRMQ } from "@nestjs/microservices";
import { BaseEvent } from "@oursocial/domain";
import { MEETUPS_EVENTS_QUEUE, ROOMS_EVENTS_QUEUE } from "./event-bus.constants";

@Injectable()
export class EventBusService {
  constructor(
    @Inject(ROOMS_EVENTS_QUEUE) private roomClient: ClientRMQ,
    @Inject(MEETUPS_EVENTS_QUEUE) private meetupClient: ClientRMQ,
  ) { }
  sendRoomEvent(event: BaseEvent) {
    this.roomClient.emit(event.name, event);
  }
  sendMeetupEvent(event: BaseEvent) {
    this.roomClient.emit(event.name, event);
  }
}
