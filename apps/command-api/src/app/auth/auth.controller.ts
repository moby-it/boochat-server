import { AuthenticateCommand, AuthenticateCommandResult } from '@boochat/application';
import { UserDto } from '@boochat/domain';
import { AuthResponse } from '@boochat/shared';
import {
  BadRequestException,
  Body,
  Controller,
  NotImplementedException,
  Param,
  Post,
  Put,
  SerializeOptions
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

@Controller('auth')
export class AuthController {
  constructor(private commandBus: CommandBus) {}

  @Post()
  @SerializeOptions({ strategy: 'exposeAll' })
  async authenticate(@Body() userDto: UserDto): Promise<AuthResponse> {
    const result = (await this.commandBus.execute(
      new AuthenticateCommand(userDto)
    )) as AuthenticateCommandResult;
    if (result.failed) throw new BadRequestException(result.error);
    return result.props as AuthResponse;
  }
  @Put('update/:id')
  async updateUser(@Param() id: string, @Body() userDto: UserDto): Promise<void> {
    throw new NotImplementedException();
  }
}
