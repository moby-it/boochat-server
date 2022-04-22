import { PersistenceReadDbModule } from '@boochat/persistence/read-db';
import { PersistenceSharedDbModule } from '@boochat/persistence/shared-db';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ActiveUsersModule } from './active-users.module';
import { Mapper } from './mapper';
import { MeetupEventHandlers } from './meetups';
import { MeetupsQueryHandlers } from './meetups/queries';
import { NotificationService } from './notifications/notification.service';
import { RoomEventHandlers } from './rooms';
import { RoomQueryHandlers } from './rooms/queries';
import { UserQueryHandlers } from './users';
import { AuthModule } from './users/auth/auth.module';
import { WebsocketEventHandlers } from './websockets';

@Module({
  imports: [CqrsModule, PersistenceReadDbModule, PersistenceSharedDbModule, AuthModule, ActiveUsersModule],
  providers: [
    ...UserQueryHandlers,
    ...MeetupsQueryHandlers,
    ...RoomQueryHandlers,
    ...RoomEventHandlers,
    ...MeetupEventHandlers,
    ...WebsocketEventHandlers,
    NotificationService,
    Mapper
  ],
  exports: [NotificationService]
})
export class QueryApplicationModule {}
