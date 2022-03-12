import { BadRequestException, Body, ClassSerializerInterceptor, Controller, InternalServerErrorException, Post, UseInterceptors } from '@nestjs/common';
import { GoogleId, User } from '@oursocial/domain';
import { UserPersistenceService } from '@oursocial/persistence';
import { UserDto } from 'libs/persistence/src/lib/users/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private userService: UserPersistenceService) { }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('')
  async authenticate(@Body() userDto: UserDto): Promise<User> {
    try {
      let user = await this.userService.findOneByGoogleId(userDto.googleId);
      if (!user) {
        user = await this.userService.create(userDto);
      }
      return User.create({ googleId: GoogleId.create({ id: userDto.googleId }), name: userDto.name }, user.id);
    } catch (e) {
      throw new BadRequestException(e);
    }

  }

}
