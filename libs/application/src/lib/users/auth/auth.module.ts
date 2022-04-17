import { PersistenceSharedDbModule } from '@boochat/persistence/shared-db';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { WsJwtGuard } from './jwt.guard';
@Module({
  imports: [
    PersistenceSharedDbModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '4h' }
    })
  ],
  providers: [AuthService, WsJwtGuard],
  exports: [AuthService, WsJwtGuard]
})
export class AuthModule {}
