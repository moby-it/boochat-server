import { PollTypeEnum, Result, UserCreatedPollEvent } from '@boochat/domain';
import { MeetupEventStoreService } from '@boochat/persistence/events-store';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EventBusService } from '../../event-bus';

export class CreatePollCommand {
  constructor(
    public readonly userId: string,
    public readonly meetupId: string,
    public readonly pollType: PollTypeEnum,
    public readonly description: string,
    public readonly pollChoices: string[]
  ) {}
}
@CommandHandler(CreatePollCommand)
export class CreatePollCommandHandler implements ICommandHandler<CreatePollCommand> {
  constructor(private meetupStore: MeetupEventStoreService, private eventBus: EventBusService) {}
  async execute(command: CreatePollCommand): Promise<Result> {
    try {
      const { userId, meetupId, description, pollType, pollChoices } = command;
      const event = new UserCreatedPollEvent(userId, meetupId, pollType, description, pollChoices);
      await this.meetupStore.save(event);
      await this.eventBus.emitMeetupEvent(event);
      return Result.success();
    } catch (e) {
      return Result.fail(e);
    }
  }
}
