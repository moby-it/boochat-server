import { Controller, Get, NotImplementedException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

@Controller('meetup')
export class MeetupController {
  constructor(private queryBus: QueryBus) {}
  @Get()
  async getMeetups() {
    throw new NotImplementedException();
  }
}
