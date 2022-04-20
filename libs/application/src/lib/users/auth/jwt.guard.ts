import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const token = request.headers.authorization?.split(' ')[1];
      return await this.authService.verify(token);
    } catch (err) {
      console.error(err);
      throw new UnauthorizedException('failed to authenticate');
    }
  }
}
