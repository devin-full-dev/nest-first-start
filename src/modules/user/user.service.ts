import { LoginDto } from './../auth/dto/login.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// Exception
import { Conflict } from '../../exceptions/conflict.exception';

// User
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { UserRegisterDto } from './dto/user-register.dto';

// Utils
import { BaseUtils } from './../../utils/index';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly _userRepository: UserRepository,
  ) {}

  findOne(user: LoginDto): Promise<User> {
    return this._userRepository.findOne({
      where: [{ email: user?.username }, { username: user?.username }],
    });
  }

  async createUser(userRegisterDto: UserRegisterDto): Promise<User> {
    const { email, username, password } = userRegisterDto;
    const existingUser = await this._userRepository.findOne({
      select: ['email', 'username'],
      where: [{ email }, { username }],
    });
    const hashedPassword = BaseUtils.generateHsh(password);
    if (!existingUser) {
      const user = await this._userRepository.create({
        ...userRegisterDto,
        password: hashedPassword,
      });
      const newUser = await this._userRepository.save(user);
      delete newUser.password;
      return newUser;
    } else {
      throw new Conflict('Username or Email Already Exist!');
    }
  }
}
