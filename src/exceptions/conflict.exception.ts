import { ConflictException } from '@nestjs/common';

export class Conflict extends ConflictException {
  constructor(error?: string) {
    super(error);
  }
}
