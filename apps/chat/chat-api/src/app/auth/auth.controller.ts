import { Body, Controller, Post } from '@nestjs/common';
import { UserPersistenceService } from '@oursocial/persistence';
import { UserDto } from 'libs/persistence/src/lib/users/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private userService: UserPersistenceService) { }

  @Post('')
  async authenticate(@Body() userDto: UserDto) {
    await this.userService.upsert(userDto);
  }

}
