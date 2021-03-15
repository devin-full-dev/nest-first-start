import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
@Controller('users')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get()
  createUser(): string {}
}
