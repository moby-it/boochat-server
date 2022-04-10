import { User } from '@boochat/domain';
import { Controller, Get, NotImplementedException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

@Controller('users')
export class UserController {
  constructor(private queryBus: QueryBus) {}
  @Get()
  async getUsers(): Promise<User[]> {
    throw new NotImplementedException();
  }
}
