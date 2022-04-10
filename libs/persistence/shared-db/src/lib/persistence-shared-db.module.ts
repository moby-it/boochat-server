import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SHARED_DB_CONNECTION_NAME, SHARED_DB_NAME, SHARED_SERVER_URL } from './common';
import { UserPersistenceModule, UserPersistenceService } from './users';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRoot(process.env[SHARED_SERVER_URL] as string, {
      connectionName: SHARED_DB_CONNECTION_NAME,
      dbName: process.env[SHARED_DB_NAME]
    }),
    UserPersistenceModule
  ],
  providers: [UserPersistenceService],
  exports: [UserPersistenceService]
})
export class PersistenceSharedDbModule {}
