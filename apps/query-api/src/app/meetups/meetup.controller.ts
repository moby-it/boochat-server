import { GetMeetupsQuery, GetMeetupsQueryResponse } from '@boochat/application';
import { UserId } from '@boochat/domain';
import { Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

@Controller('meetups')
export class MeetupController {
  constructor(private queryBus: QueryBus) {}
  @Get('getByUserId/:id')
  async getMeetupsByUserId(@Param('id') userId: UserId) {
    const result = (await this.queryBus.execute(new GetMeetupsQuery(userId))) as GetMeetupsQueryResponse;
    if (result.succeded) return result.props;
    return result.error;
  }
}
