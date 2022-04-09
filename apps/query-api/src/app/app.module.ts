import { QueryApplicationModule } from '@boochat/application';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApplicationEventsController } from './application-events.controller';
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), QueryApplicationModule],
  controllers: [ApplicationEventsController]
})
export class AppModule {}
