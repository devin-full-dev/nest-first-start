import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get()
  getUsers(): string {
    return 'Hello This user controller';
  }
}
