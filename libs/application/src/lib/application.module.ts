import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MessageCommandHandlers, FindRoomByIdQueryHandler, FindRoomByUserIdQueryHandler, RoomCommandHandlers } from './chat';
import { ActiveUsersCommandHandlers } from './users';
const CommandHandlers = [...ActiveUsersCommandHandlers, ...RoomCommandHandlers, ...MessageCommandHandlers];
const QueryHandlers = [FindRoomByUserIdQueryHandler, FindRoomByIdQueryHandler];
@Module({
  imports: [CqrsModule],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers],
  exports: [],
})
export class ApplicationModule { }
