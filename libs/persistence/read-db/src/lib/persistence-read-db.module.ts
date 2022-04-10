import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { READ_DB_CONNECTION_NAME, READ_DB_NAME, READ_SERVER_URL } from './common';
@Module({
  imports: [
    MongooseModule.forRoot(process.env[READ_SERVER_URL] as string, {
      connectionName: READ_DB_CONNECTION_NAME,
      dbName: process.env[READ_DB_NAME]
    })
  ]
})
export class PersistenceReadDbModule {}
