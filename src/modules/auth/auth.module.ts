import { UserModule } from './../user/user.module';
import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [forwardRef(() => UserModule)],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
