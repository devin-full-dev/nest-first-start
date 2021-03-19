import { TokenPayLoadDto } from './token-payload.dto';
import { UserRegisterDto } from './../../user/dto/user-register.dto';

export class LoginPayLoadDto {
  user: UserRegisterDto;
  accessToken: TokenPayLoadDto;

  constructor(user: UserRegisterDto, accessToken: TokenPayLoadDto) {
    this.user = user;
    this.accessToken = accessToken;
  }
}
