import { Body, Controller, Post } from '@nestjs/common';

// Service
import { AuthService } from './auth.service';
import { UserService } from './../user/user.service';

// Dto
import { LoginDto } from './dto/login.dto';
import { UserRegisterDto } from './../user/dto/user-register.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly _userService: UserService,
    private readonly _authService: AuthService,
  ) {}

  @Post('register')
  registerUser(
    @Body() userRegisterDto: UserRegisterDto,
  ): Promise<UserRegisterDto> {
    return this._userService.createUser(userRegisterDto);
  }

  // @UseGuards(AuthenticationAuthGuard)
  @Post('login')
  login(@Body() userLogin: LoginDto): Promise<LoginDto> {
    return this._authService.validateUser(userLogin);
  }
}
