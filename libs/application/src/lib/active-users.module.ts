import { Module } from '@nestjs/common';
import { ActiveUsersService } from './users';

@Module({
  providers: [ActiveUsersService],
  exports: [ActiveUsersService]
})
export class ActiveUsersModule {}
