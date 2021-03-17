import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './../user/user.service';

// Dto
import { LoginDto } from './dto/login.dto';
import { UserRegisterDto } from './../user/dto/user-register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly _userService: UserService) {}

  @Post('register')
  registerUser(
    @Body() userRegisterDto: UserRegisterDto,
  ): Promise<UserRegisterDto> {
    return this._userService.createUser(userRegisterDto);
  }

  @Post('login')
  login(@Body() userLogin: LoginDto): Promise<LoginDto> {
    return this._userService.getUserCredential(userLogin);
  }
}
