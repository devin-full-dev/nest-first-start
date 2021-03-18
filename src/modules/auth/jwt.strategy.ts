import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly _authService: AuthService) {
    super({ username: 'email' || 'username' });
  }

  async validate(userLogin: LoginDto): Promise<any> {
    const user = await this._authService.validateUser(userLogin);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
