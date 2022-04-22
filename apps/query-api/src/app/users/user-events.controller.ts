import { UserAuthenticatedEvent, UserEventEnum } from '@boochat/domain';
import { Controller } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { EventPattern } from '@nestjs/microservices';
import { plainToInstance } from 'class-transformer';

@Controller()
export class UserEventsController {
  constructor(private eventBus: EventBus) {}
  @EventPattern(UserEventEnum[UserEventEnum.USER_AUTHENTICATED])
  async userAuthenticated(event: UserAuthenticatedEvent) {
    await this.eventBus.publish(plainToInstance(UserAuthenticatedEvent, event));
  }
}
