import { PersistenceReadDbModule } from '@boochat/persistence/read-db';
import { PersistenceSharedDbModule } from '@boochat/persistence/shared-db';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserQueryHandlers } from './users';

@Module({
  imports: [CqrsModule, PersistenceReadDbModule, PersistenceSharedDbModule],
  providers: [...UserQueryHandlers],
  exports: []
})
export class QueryApplicationModule {}
