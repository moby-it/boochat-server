import { User, UserDto } from '@boochat/domain';
import { UserPersistenceService } from '@boochat/persistence/shared-db';
import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { transformToPlain } from '../../common';
import { AuthResponse } from './auth-response.model';
@Injectable()
export class AuthService {
  constructor(private userService: UserPersistenceService, private jwtService: JwtService) {}
  public async authenticate(userDto: UserDto): Promise<AuthResponse> {
    try {
      let userDocument = await this.userService.findOneByGoogleId(userDto.googleId);
      if (!userDocument) {
        userDocument = await this.userService.create(userDto);
      }
      const user = User.create(
        {
          googleId: userDto.googleId,
          name: userDto.name,
          imageUrl: userDto.imageUrl
        },
        userDocument.id as string
      );
      const token = this.jwtService.sign(transformToPlain(user));
      return { token, user };
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
  public async verify(token: string) {
    try {
      const user = this.jwtService.decode(token) as User;
      const userDocument = await this.userService.findOneByGoogleId(user.googleId);
      return !!userDocument;
    } catch (e) {
      return false;
    }
  }
  public async updateUser(id: string, userDto: UserDto): Promise<void> {
    try {
      await this.userService.update(id, userDto);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
  public getUserId(token: string) {
    const user = this.jwtService.decode(token) as User;
    return user.id;
  }
}
