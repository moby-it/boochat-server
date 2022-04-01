import { User } from '@boochat/domain';
import { UserDto, UserPersistenceService } from '@boochat/persistence';
import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private userService: UserPersistenceService) {}

  @Post('')
  async authenticate(@Body() userDto: UserDto): Promise<User> {
    try {
      let user = await this.userService.findOneByGoogleId(userDto.googleId);
      if (!user?.id) {
        user = await this.userService.create(userDto);
      }
      return User.create(
        {
          googleId: userDto.googleId,
          name: userDto.name,
          imageUrl: userDto.imageUrl,
        },
        user.id as string
      );
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
  @Put('update/:id')
  async updateUser(
    @Param() id: string,
    @Body() userDto: UserDto
  ): Promise<void> {
    try {
      await this.userService.update(id, userDto);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
