import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_SERVER_URL, SHARED_DB_CONNECTION_NAME, SHARED_DB_NAME } from './common';
import { UserPersistenceModule, UserPersistenceService } from './users';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRoot(process.env[MONGO_SERVER_URL] as string, {
      connectionName: SHARED_DB_CONNECTION_NAME,
      dbName: process.env[SHARED_DB_NAME]
    }),
    UserPersistenceModule
  ],
  providers: [UserPersistenceService],
  exports: [UserPersistenceService]
})
export class PersistenceSharedDbModule {}
