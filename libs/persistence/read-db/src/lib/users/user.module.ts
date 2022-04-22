import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { READ_DB_CONNECTION_NAME } from '../common';
import { User, UserSchema, USERS_COLLECTION_NAME } from './user.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: User.name, schema: UserSchema, collection: USERS_COLLECTION_NAME }],
      READ_DB_CONNECTION_NAME
    )
  ]
})
export class UsersModule {}
