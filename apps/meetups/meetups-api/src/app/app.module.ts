import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ApplicationModule } from '@oursocial/application';
import { PersistenceModule } from '@oursocial/persistence';


@Module({
  imports: [
    PersistenceModule,
    ApplicationModule,
    CqrsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
