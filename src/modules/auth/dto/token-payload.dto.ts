export class TokenPayLoadDto {
  expiresIn: Date;

  accessToken: string;

  constructor(data: { expiresIn: Date; accessToken: any }) {
    this.expiresIn = data.expiresIn;
    this.accessToken = data.accessToken;
  }
}
