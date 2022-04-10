import { AuthService } from '@boochat/application';
import { User, UserDto } from '@boochat/domain';
import { Body, Controller, Param, Post, Put } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('')
  async authenticate(@Body() userDto: UserDto): Promise<User> {
    return await this.authService.authenticate(userDto);
  }
  @Put('update/:id')
  async updateUser(@Param() id: string, @Body() userDto: UserDto): Promise<void> {
    return await this.authService.updateUser(id, userDto);
  }
}
