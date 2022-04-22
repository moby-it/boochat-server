import { ActiveUsersModule, AuthModule, QueryApplicationModule } from '@boochat/application';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserEventsController } from './user-events.controller';
import { UsersGateway } from './users.gateway';

@Module({
  controllers: [UserEventsController],
  imports: [CqrsModule, QueryApplicationModule, AuthModule, ActiveUsersModule],
  providers: [UsersGateway]
})
export class UserModule {}
