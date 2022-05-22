import { User, UserDto } from '@boochat/domain';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { transformToPlain } from '../../common';
import { EncryptService } from '../../common/encrypt.service';
import { AuthResponse } from './auth-response.model';

@Injectable()
export class AuthService {
  saltRounds = 10;

  constructor(private jwtService: JwtService, private encrypt: EncryptService) {}

  public async authenticate(userDto: UserDto): Promise<AuthResponse> {
    try {
      const user = User.create(
        {
          name: userDto.name,
          imageUrl: userDto.imageUrl
        },
        userDto.id as string
      );
      const token = this.jwtService.sign(transformToPlain(user));
      const encryptedToken = await this.encrypt.encrypt(token);
      return { token: encryptedToken, user };
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  public async verify(token: string) {
    try {
      const decryptedToken = await this.encrypt.decrypt(token);
      const user = this.jwtService.decode(decryptedToken) as User;
      return !!(user.id && user.name && user.imageUrl);
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  public async getUserId(token: string) {
    const decryptedToken = await this.encrypt.decrypt(token);
    const user = this.jwtService.decode(decryptedToken) as User;
    return user.id;
  }
}
