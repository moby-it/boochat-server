import { AuthService } from '@boochat/application';
import { UserDto } from '@boochat/domain';
import { AuthResponse } from '@boochat/shared';
import { Body, Controller, Param, Post, Put, SerializeOptions } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @SerializeOptions({ strategy: 'exposeAll' })
  async authenticate(@Body() userDto: UserDto): Promise<AuthResponse> {
    const response = await this.authService.authenticate(userDto);
    return response;
  }
  @Put('update/:id')
  async updateUser(@Param() id: string, @Body() userDto: UserDto): Promise<void> {
    return await this.authService.updateUser(id, userDto);
  }
}
