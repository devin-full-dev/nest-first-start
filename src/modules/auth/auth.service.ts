import * as moment from 'moment';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { BaseUtils } from './../../utils/index';
import { NotFound } from './../../exceptions/notfound.exception';

// Service
import { UserService } from './../user/user.service';
import { TokenPayLoadDto } from './dto/token-payload.dto';

// DTO
import { LoginDto } from './dto/login.dto';

// Entity
import { User } from './../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly _jwtService: JwtService,
    private readonly _userService: UserService,
  ) {}
  async generateToken(user: User): Promise<TokenPayLoadDto> {
    return new TokenPayLoadDto({
      expiresAt: moment().add(10, 'd').toDate(),
      accessToken: await this._jwtService.signAsync({
        id: user?.id,
        user: user?.username,
        email: user?.email,
      }),
    });
  }

  async validateUser(userDto: LoginDto): Promise<User> {
    const user = await this._userService.findOne(userDto);
    const hashedPassword = user?.password;
    const isValidPassword = await BaseUtils.verifyHash(
      userDto.password,
      hashedPassword,
    );
    if (user && isValidPassword) {
      delete user.password;
      return user;
    } else {
      throw new NotFound('Bad Uer Credential');
    }
  }
}
