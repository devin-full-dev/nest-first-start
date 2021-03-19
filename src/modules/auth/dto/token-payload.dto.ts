export class TokenPayLoadDto {
  expiresAt: Date;

  accessToken: string;

  constructor(data: { expiresAt: Date; accessToken: any }) {
    this.expiresAt = data.expiresAt;
    this.accessToken = data.accessToken;
  }
}
