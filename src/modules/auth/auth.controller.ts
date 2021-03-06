import { JwtAuthGuard } from './../../guards/jwt.guard';
import {
  Body,
  Post,
  HttpCode,
  UseGuards,
  HttpStatus,
  Controller,
} from '@nestjs/common';

// Service
import { AuthService } from './auth.service';
import { UserService } from './../user/user.service';

// Dto
import { LoginDto } from './dto/login.dto';
import { LoginPayLoadDto } from './dto/login-payload.dto';
import { UserRegisterDto } from './../user/dto/user-register.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly _userService: UserService,
    private readonly _authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('register')
  registerUser(
    @Body() userRegisterDto: UserRegisterDto,
  ): Promise<UserRegisterDto> {
    return this._userService.createUser(userRegisterDto);
  }

  @HttpCode(HttpStatus.FOUND)
  @Post('login')
  async login(@Body() userLogin: LoginDto): Promise<LoginPayLoadDto> {
    const user = await this._authService.validateUser(userLogin);
    const token = await this._authService.generateToken(user);
    return new LoginPayLoadDto(user, token);
  }
}
