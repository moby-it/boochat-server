import { ApplicationEventEnum } from '@boochat/domain';
import { Controller } from '@nestjs/common';
import { EventPattern, Transport } from '@nestjs/microservices';

@Controller()
export class ApplicationEventsController {
  @EventPattern(ApplicationEventEnum[ApplicationEventEnum.USER_CONNECTED], Transport.RMQ)
  async userConnected(data: any) {
    console.log(data);
  }
  @EventPattern(ApplicationEventEnum[ApplicationEventEnum.USER_DISCONNECTED], Transport.RMQ)
  async userDisconnected(data: any) {
    console.log(data);
  }
}
