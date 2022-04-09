import { PersistenceReadDbModule } from '@boochat/persistence/read-db';
import { Module } from '@nestjs/common';

@Module({
  imports: [PersistenceReadDbModule],
  providers: [],
  exports: []
})
export class QueryApplicationModule {}
