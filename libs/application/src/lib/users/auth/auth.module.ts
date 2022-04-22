import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { EncryptService } from '../../common/encrypt.service';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtGuard } from './jwt.guard';
import { WsJwtGuard } from './ws-jwt.guard';
@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '4h' }
    })
  ],
  providers: [AuthService, WsJwtGuard, JwtGuard, EncryptService],
  exports: [AuthService, WsJwtGuard, JwtGuard]
})
export class AuthModule {}
