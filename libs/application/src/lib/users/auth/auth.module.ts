import { PersistenceSharedDbModule } from '@boochat/persistence/shared-db';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { EncryptService } from '../../common/encrypt.service';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtGuard } from './jwt.guard';
import { JwtStrategy } from './jwt.strategy';
import { WsJwtGuard } from './ws-jwt.guard';
@Module({
  imports: [
    PersistenceSharedDbModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '4h' }
    })
  ],
  providers: [AuthService, WsJwtGuard, JwtStrategy, JwtGuard, EncryptService],
  exports: [AuthService, WsJwtGuard, JwtGuard]
})
export class AuthModule {}
