import { BadRequestException, Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { GoogleId, User } from '@oursocial/domain';
import { UserPersistenceService } from '@oursocial/persistence';
import { UserDto } from 'libs/persistence/src/lib/users/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private userService: UserPersistenceService) { }

  @Post('')
  async authenticate(@Body() userDto: UserDto): Promise<User> {
    const result = await this.userService.upsert(userDto);
    if (result.succeded)
      return User.create({ googleId: GoogleId.create({ id: userDto.googleId }), name: userDto.name });
    else
      throw new BadRequestException();
  }

}
