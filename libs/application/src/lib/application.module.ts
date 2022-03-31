import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PersistenceModule } from '@oursocial/persistence';
import { MessageCommandHandlers, RoomCommandHandlers } from './chat';
import { ActiveUserQueryHandlers, ActiveUsersCommandHandlers } from './users';
const CommandHandlers = [...ActiveUsersCommandHandlers, ...RoomCommandHandlers, ...MessageCommandHandlers];
@Module({
  imports: [CqrsModule, PersistenceModule],
  providers: [
    ...CommandHandlers,
    ...ActiveUserQueryHandlers
  ],
  exports: [],
})
export class ApplicationModule { }
