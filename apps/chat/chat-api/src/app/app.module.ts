import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ApplicationModule } from '@oursocial/application';
import { PersistenceModule } from '@oursocial/persistence';

@Module({
  controllers: [],
  imports: [
    PersistenceModule,
    ApplicationModule,
    CqrsModule
  ],
  providers: [],
})
export class AppModule {
}
