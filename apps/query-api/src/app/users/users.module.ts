import { AuthModule, QueryApplicationModule } from '@boochat/application';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UsersGateway } from './users.gateway';

@Module({
  controllers: [],
  imports: [CqrsModule, QueryApplicationModule, AuthModule],
  providers: [UsersGateway]
})
export class UserModule {}
