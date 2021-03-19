import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// Database
import { DatabaseModule } from './config/database.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';

// Constants
import * as Constants from './common/constants/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        [Constants.JWT_SECRET_KEY]: Joi.string().required(),
        [Constants.POSTGRES_HOST]: Joi.string().required(),
        [Constants.POSTGRES_PORT]: Joi.number().required(),
        [Constants.POSTGRES_USER]: Joi.string().required(),
        [Constants.POSTGRES_PASSWORD]: Joi.string().required(),
        [Constants.POSTGRES_DB]: Joi.string().required(),
        [Constants.PORT]: Joi.number().required(),
      }),
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
