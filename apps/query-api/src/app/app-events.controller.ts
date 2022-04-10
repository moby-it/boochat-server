import { ApplicationEventEnum, UserConnectedEvent, UserDisconnectedEvent } from '@boochat/domain';
import { Controller } from '@nestjs/common';
import { EventPattern, Transport } from '@nestjs/microservices';

@Controller()
export class AppEventsController {
  @EventPattern(ApplicationEventEnum[ApplicationEventEnum.USER_CONNECTED], Transport.RMQ)
  async userConnected(event: UserConnectedEvent) {
    console.log(event);
  }
  @EventPattern(ApplicationEventEnum[ApplicationEventEnum.USER_DISCONNECTED], Transport.RMQ)
  async userDisconnected(event: UserDisconnectedEvent) {
    console.log(event);
  }
}
