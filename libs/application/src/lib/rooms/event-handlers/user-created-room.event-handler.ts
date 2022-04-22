import { CreateRoomEventDto, Result, RoomCreatedEvent } from '@boochat/domain';
import { RoomsRepository } from '@boochat/persistence/read-db';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(RoomCreatedEvent)
export class UserCreatedRoomEventHandler implements IEventHandler<RoomCreatedEvent> {
  constructor(private repository: RoomsRepository) {}
  async handle(event: RoomCreatedEvent): Promise<Result> {
    try {
      const dto: CreateRoomEventDto = {
        _id: event.id,
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
