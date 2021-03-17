import { ConflictException } from '@nestjs/common';

export class UserConflictException extends ConflictException {
  constructor(error?: string) {
    super(error);
  }
}
