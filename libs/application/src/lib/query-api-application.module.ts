import { PersistenceReadDbModule } from '@boochat/persistence/read-db';
import { PersistenceSharedDbModule } from '@boochat/persistence/shared-db';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { Mapper } from './mapper';
import { MeetupEventHandlers } from './meetups';
import { MeetupsQueryHandlers } from './meetups/queries';
import { RoomEventHandlers } from './rooms';
import { RoomQueryHandlers } from './rooms/queries';
import { UserQueryHandlers } from './users';

@Module({
  imports: [CqrsModule, PersistenceReadDbModule, PersistenceSharedDbModule],
  providers: [
    ...UserQueryHandlers,
    ...MeetupsQueryHandlers,
    ...RoomQueryHandlers,
    ...RoomEventHandlers,
    // ...MeetupEventHandlers,
    Mapper
  ],
  exports: []
})
export class QueryApplicationModule {}
