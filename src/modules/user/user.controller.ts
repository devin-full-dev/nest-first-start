import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

// dto
import { UserRegisterDto } from './dto/user-register.dto';

@Controller('users')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Post()
  registerUser(
    @Body() userRegisterDto: UserRegisterDto,
  ): Promise<UserRegisterDto> {
    return this._userService.createUser(userRegisterDto);
  }
}
