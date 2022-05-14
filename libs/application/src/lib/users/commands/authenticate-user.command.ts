import { Result, UserAuthenticatedEvent, UserDto } from '@boochat/domain';
import { UserEventsStoreService } from '@boochat/persistence/events-store';
import { AuthResponse } from '@boochat/shared';
import { ConfigService } from '@nestjs/config';
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
    private authService: AuthService,
    private configService: ConfigService
  ) {}
  async execute(command: AuthenticateCommand): Promise<AuthenticateCommandResult> {
    try {
      const userDto = command.dto;
      const allowedUsers = this.configService.get('ALLOWED_USERS') as string;
      if (!allowedUsers) Result.fail('Cannot create user with no allowed users list');
      const allowedUsersList = allowedUsers.split(',');
      if (allowedUsersList.includes(userDto.email)) {
        const response = await this.authService.authenticate(userDto);
        const event = new UserAuthenticatedEvent(userDto.id, userDto.imageUrl, userDto.email, userDto.name);
        await this.userEventStore.save(event);
        await this.eventBus.emitUserEvent(event);
        return Result.success(response);
      } else {
        return Result.fail('User not found in allowed users list');
      }
    } catch (e) {
      return Result.fail(e);
    }
  }
}
