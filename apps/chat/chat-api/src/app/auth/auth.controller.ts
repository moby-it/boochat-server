import { BadRequestException, Body, ClassSerializerInterceptor, Controller, HttpCode, HttpStatus, InternalServerErrorException, Param, Post, Put, Res, UseInterceptors } from '@nestjs/common';
import { GoogleId, User } from '@oursocial/domain';
import { UserPersistenceService } from '@oursocial/persistence';
import { UserDto } from 'libs/persistence/src/lib/users/user.dto';
import { identity } from 'rxjs';

@Controller('auth')
export class AuthController {
  constructor(private userService: UserPersistenceService) { }

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
  @Put('update/:id')
  async updateUser(@Param() id: string, @Body() userDto: UserDto): Promise<void> {
    const result = await this.userService.update(id, userDto);
    if (result.succeded) return;
    throw new InternalServerErrorException(result.error);
  }
}
