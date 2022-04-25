import { AuthService, HttpToken, JwtGuard, PushNotificationService } from '@boochat/application';
import { Result } from '@boochat/domain';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PushSubscription } from 'web-push';
@Controller()
export class WebPushController {
  constructor(
    private config: ConfigService,
    private pushNotificationService: PushNotificationService,
    private authService: AuthService
  ) {}
  @UseGuards(JwtGuard)
  @Post('subscribe')
  async subscribe(@HttpToken() token: string, @Body() subscription: PushSubscription) {
    try {
      const userId = await this.authService.getUserId(token);
      this.pushNotificationService.addSubscription(userId, subscription);
      return Result.success();
    } catch (e) {
      return Result.fail(e);
    }
  }
}
