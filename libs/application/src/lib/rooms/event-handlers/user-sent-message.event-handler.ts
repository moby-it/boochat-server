import { CreateMessageDto, UserSentMessageEvent } from '@boochat/domain';
import { RoomsRepository } from '@boochat/persistence/read-db';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(UserSentMessageEvent)
export class UserSentMessageEventHandler implements IEventHandler<UserSentMessageEvent> {
  constructor(private repository: RoomsRepository) {}
  async handle(event: UserSentMessageEvent): Promise<void> {
    const dto: CreateMessageDto = { content: event.content, roomId: event.roomId, senderId: event.senderId };
    await this.repository.saveMessage(dto);
  }
}
