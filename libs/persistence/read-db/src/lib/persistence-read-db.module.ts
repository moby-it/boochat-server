import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'mssql',
        url: config.get('SQL_CONNECTION_STRING'),
        entities: [__dirname + '/**/*.entity.ts']
      })
    })
  ],
  controllers: [],
  providers: [],
  exports: []
})
export class PersistenceReadDbModule {}
