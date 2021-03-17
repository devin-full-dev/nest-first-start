import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// Exception
import { UserNotFoundException } from './../../exceptions/user-nofound.exception';
import { UserConflictException } from './../../exceptions/user-conflict.exception';

// User
import { User } from './user.entity';
import { LoginDto } from './../auth/dto/login.dto';
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
      throw new UserConflictException('Username or Email Already Exist!');
    }
  }

  async getUserCredential(userDto: LoginDto): Promise<User> {
    const { username, password } = userDto;
    const user = await this._userRepository.findOne({
      where: [{ username }, { email: username }],
    });
    const hashedPassword = user?.password;
    const isValidPassword = BaseUtils.verifyHash(password, hashedPassword);
    if (!user || !isValidPassword) {
      throw new UserNotFoundException('User Does Not Exist');
    }
    delete user.password;
    return user;
  }
}
