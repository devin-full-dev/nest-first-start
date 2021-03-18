import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from './../user/user.module';
import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  JWT_SECRET_KEY,
  JWT_EXPIRATION_TIME,
} from './../../common/constants/config';

@Module({
  imports: [
    forwardRef(() => UserModule),
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get(JWT_SECRET_KEY),
        signOptions: {
          expiresIn: configService.get(JWT_EXPIRATION_TIME),
        },
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
