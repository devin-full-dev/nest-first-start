import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// User
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { UserRegisterDto } from './dto/user-register.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly _userRepository: UserRepository,
  ) {}

  async createUser(userRegisterDto: UserRegisterDto): Promise<User> {
    const user = await this._userRepository.create(userRegisterDto);
    return this._userRepository.save(user);
  }
}
