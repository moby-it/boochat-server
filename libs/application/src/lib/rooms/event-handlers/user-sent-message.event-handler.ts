import { CreateMessageDto, MessageSentEvent } from '@boochat/domain';
import { RoomsRepository } from '@boochat/persistence/read-db';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(MessageSentEvent)
export class UserSentMessageEventHandler implements IEventHandler<MessageSentEvent> {
  constructor(private repository: RoomsRepository) {}
  async handle(event: MessageSentEvent): Promise<void> {
    const dto: CreateMessageDto = {
      _id: event.id,
      content: event.content,
      roomId: event.roomId,
      senderId: event.senderId
    };
    await this.repository.saveMessage(dto);
  }
}
