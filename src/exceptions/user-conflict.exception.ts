import { ConflictException } from '@nestjs/common';

export class UserConflictException extends ConflictException {
  constructor(user?: string) {
    const userConflictMessage = `User ${user || ''} Already Exist`;
    super(userConflictMessage);
  }
}
