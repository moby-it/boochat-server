import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot(process.env.CONNECTION_STRING || "mongodb://gspanos:sinpassword@localhost", {
    dbName: 'OurSocial'
  })]
})
export class PersistenceModule { }