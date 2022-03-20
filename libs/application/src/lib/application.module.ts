import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PersistenceModule } from '@oursocial/persistence';
import { MessageCommandHandlers, MessagesSaga, RoomCommandHandlers, RoomQueryHandlers } from './chat';
import { RoomsSaga } from './chat/rooms/rooms.saga';
import { ActiveUserQueryHandlers, ActiveUsersCommandHandlers } from './users';
import { UsersSaga } from './users/users.saga';
const CommandHandlers = [...ActiveUsersCommandHandlers, ...RoomCommandHandlers, ...MessageCommandHandlers];
const QueryHandlers = [...RoomQueryHandlers, ...ActiveUserQueryHandlers];
const Sagas = [UsersSaga, MessagesSaga, RoomsSaga];
@Module({
  imports: [CqrsModule, PersistenceModule],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    ...Sagas],
  exports: [],
})
export class ApplicationModule { }
