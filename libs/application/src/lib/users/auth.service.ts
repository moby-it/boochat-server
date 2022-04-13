import { User, UserDto } from '@boochat/domain';
import { UserPersistenceService } from '@boochat/persistence/shared-db';
import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private userService: UserPersistenceService) {}
  public async authenticate(userDto: UserDto): Promise<User> {
    try {
      let user = await this.userService.findOneByGoogleId(userDto.googleId);
      if (!user) {
        user = await this.userService.create(userDto);
      }
      return User.create(
        {
          googleId: userDto.googleId,
          name: userDto.name,
          imageUrl: userDto.imageUrl
        },
        user.id as string
      );
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
  public async updateUser(id: string, userDto: UserDto): Promise<void> {
    try {
      await this.userService.update(id, userDto);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
