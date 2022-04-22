import { Result, RoomId, GoogleId, MessageSentEvent } from '@boochat/domain';
import { RoomEventsStoreService } from '@boochat/persistence/events-store';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EventBusService } from '../../event-bus';

export class SendMessageCommand {
  constructor(
    public readonly content: string,
    public readonly senderId: GoogleId,
    public readonly roomId: RoomId
  ) {}
}
@CommandHandler(SendMessageCommand)
export class SendMessageCommandHandler implements ICommandHandler<SendMessageCommand> {
  constructor(private roomStore: RoomEventsStoreService, private eventBus: EventBusService) {}
  async execute({ roomId, senderId, content }: SendMessageCommand): Promise<Result> {
    try {
      const event = new MessageSentEvent(content, senderId, roomId);
      await this.roomStore.save(event);
      await this.eventBus.emitRoomEvent(event);
      return Result.success();
    } catch (e) {
      return Result.fail(e);
    }
  }
}
