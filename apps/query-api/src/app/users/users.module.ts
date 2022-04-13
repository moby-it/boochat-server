import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserController } from './user.controller';
import { UsersGateway } from './users.gateway';

@Module({
  controllers: [UserController],
  imports: [CqrsModule],
  providers: [UsersGateway]
})
export class UserModule {}
