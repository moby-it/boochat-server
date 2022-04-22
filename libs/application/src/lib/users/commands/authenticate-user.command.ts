import { Result, UserAuthenticatedEvent, UserDto } from '@boochat/domain';
import { UserEventsStoreService } from '@boochat/persistence/events-store';
import { AuthResponse } from '@boochat/shared';
import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { EventBusService } from '../../event-bus';
import { AuthService } from '../auth';

export class AuthenticateCommand implements ICommand {
  constructor(public readonly dto: UserDto) {}
}
export type AuthenticateCommandResult = Result<AuthResponse | undefined>;
@CommandHandler(AuthenticateCommand)
export class AuthenticateCommandHandler
  implements ICommandHandler<AuthenticateCommand, AuthenticateCommandResult>
{
  constructor(
    private userEventStore: UserEventsStoreService,
    private eventBus: EventBusService,
    private authService: AuthService
  ) {}
  async execute(command: AuthenticateCommand): Promise<AuthenticateCommandResult> {
    try {
      const userDto = command.dto;
      const response = await this.authService.authenticate(userDto);
      const event = new UserAuthenticatedEvent(userDto.id, userDto.imageUrl, userDto.name);
      await this.userEventStore.save(event);
      await this.eventBus.emitUserEvent(event);
      return Result.success(response);
    } catch (e) {
      return Result.fail(e);
    }
  }
}
