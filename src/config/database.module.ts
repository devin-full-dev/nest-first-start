import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

// Constants
import * as Constants from '../common/constants/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get(Constants.POSTGRES_HOST),
        password: configService.get(Constants.POSTGRES_PASSWORD),
        username: configService.get(Constants.POSTGRES_USER),
        database: configService.get(Constants.POSTGRES_DB),
        port: configService.get(Constants.POSTGRES_PORT),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
