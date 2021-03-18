import { AuthGuard } from '@nestjs/passport';

export class AuthenticationAuthGuard extends AuthGuard('local') {}
