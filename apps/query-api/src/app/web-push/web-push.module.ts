import { AuthModule, NotificationModule } from '@boochat/application';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WebPushController } from './web-push.controller';

@Module({
  controllers: [WebPushController],
  imports: [ConfigModule, AuthModule, NotificationModule],
  providers: []
})
export class WebPushModule {}
