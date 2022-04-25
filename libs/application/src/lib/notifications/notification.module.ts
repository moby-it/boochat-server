import { PersistenceReadDbModule } from '@boochat/persistence/read-db';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PushNotificationService } from '.';
import { ActiveUsersModule } from '../active-users.module';
import { DialogNotificationService } from './dialog-notification.service';

@Module({
  imports: [ActiveUsersModule, PersistenceReadDbModule, ConfigModule],
  providers: [DialogNotificationService, PushNotificationService],
  exports: [DialogNotificationService, PushNotificationService]
})
export class NotificationModule {}
