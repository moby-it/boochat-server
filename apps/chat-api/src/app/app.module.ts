import { CacheModule, Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { ActiveUsersGateway } from "./active-users.gateway";
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [CacheModule.register([{

      store: redisStore,

      options: {
        host: "oursocial.redis.cache.windows.net",
        password: "i8FPnNx3dKqM5lFKIedioMkZAmDF6O2pKAzCaGqL57s="
      }
    }]
  )],
  controllers: [AppController],
  providers: [ActiveUsersGateway],
})
export class AppModule {
}
