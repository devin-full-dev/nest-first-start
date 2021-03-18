import { NotFound } from './../../exceptions/notfound.exception';
import { BaseUtils } from './../../utils/index';
import { Injectable } from '@nestjs/common';

// Service
import { UserService } from './../user/user.service';

// DTO
import { LoginDto } from './dto/login.dto';

// Entity
import { User } from './../user/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly _userService: UserService) {}

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
