import { GetUsersQuery } from '@boochat/application';
import { User } from '@boochat/domain';
import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

@Controller('users')
export class UserController {
  constructor(private queryBus: QueryBus) {}
  @Get()
  async getUsers(): Promise<User[]> {
    return await this.queryBus.execute(new GetUsersQuery());
  }
}
