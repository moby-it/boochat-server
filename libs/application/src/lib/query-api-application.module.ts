import { PersistenceReadDbModule } from '@boochat/persistence/read-db';
import { PersistenceSharedDbModule } from '@boochat/persistence/shared-db';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { Mapper } from './mapper';
import { MeetupEventHandlers } from './meetups';
import { MeetupsQueryHandlers } from './meetups/queries';
import { NotificationService } from './notifications/notification.service';
import { RoomEventHandlers } from './rooms';
import { RoomQueryHandlers } from './rooms/queries';
import { ActiveUsersService, UserQueryHandlers } from './users';
import { AuthModule } from './users/auth/auth.module';
import { WebsocketEventHandlers } from './websockets';

@Module({
  imports: [CqrsModule, PersistenceReadDbModule, PersistenceSharedDbModule, AuthModule],
  providers: [
    ...UserQueryHandlers,
    ...MeetupsQueryHandlers,
    ...RoomQueryHandlers,
    ...RoomEventHandlers,
    ...MeetupEventHandlers,
    ...WebsocketEventHandlers,
    ActiveUsersService,
    NotificationService,
    Mapper
  ],
  exports: [ActiveUsersService, NotificationService]
})
export class QueryApplicationModule {}
