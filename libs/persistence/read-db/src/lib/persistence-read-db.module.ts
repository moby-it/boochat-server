import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import { Room } from './model';
@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        const sqlConfig: SequelizeModuleOptions = {
          dialect: 'mssql',
          host: config.get('SQL_HOST'),
          port: +config.get('SQL_PORT'),
          username: config.get('SQL_USERNAME'),
          password: config.get('SQL_PASSWORD'),
          database: config.get('SQL_DB_NAME'),
          models: [Room],
          autoLoadModels: true,
          synchronize: true
        };
        console.log(sqlConfig);
        return sqlConfig;
      },
      inject: [ConfigService]
    })
  ]
})
export class PersistenceReadDbModule {}
