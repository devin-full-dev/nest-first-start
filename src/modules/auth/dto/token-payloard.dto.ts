export class TokenPayLoadDto {
  expiresIn: number;

  accessToken: string;

  constructor(data: { expiresIn: number; accessToken: any }) {
    this.expiresIn = data.expiresIn;
    this.accessToken = data.accessToken;
  }
}
