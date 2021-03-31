import { ConfigService } from '@nestjs/config';
import { JwtPayload } from './dto/jwt-payload.dto';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { UserService } from './../user/user.service';
import { JWT_SECRET_KEY } from './../../common/constants/config';
import { Injectable, UnauthorizedException, HttpStatus } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly _userService: UserService,
    private readonly _configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: _configService.get(JWT_SECRET_KEY),
    });
  }

  async validate(payload: JwtPayload): Promise<any> {
    const { userId } = payload;
    const user = await this._userService.getById(userId);

    if (!user) {
      throw new UnauthorizedException(
        HttpStatus.UNAUTHORIZED,
        'User unauthorize!',
      );
    }
    return user;
  }
}
