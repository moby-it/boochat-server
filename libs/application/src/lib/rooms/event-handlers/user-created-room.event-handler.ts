import { CreateRoomDto, Result, UserCreatedRoomEvent } from '@boochat/domain';
import { RoomsRepository } from '@boochat/persistence/read-db';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(UserCreatedRoomEvent)
export class UserCreatedRoomEventHandler implements IEventHandler<UserCreatedRoomEvent> {
  constructor(private repository: RoomsRepository) {}
  async handle(event: UserCreatedRoomEvent): Promise<Result> {
    try {
      const dto: CreateRoomDto = {
        name: event.roomName,
        imageUrl: event.imageUrl,
        participantIds: event.userIds,
        userId: event.userId
      };
      await this.repository.createRoom(dto);
      return Result.success();
    } catch (e) {
      return Result.fail(e);
    }
  }
}
