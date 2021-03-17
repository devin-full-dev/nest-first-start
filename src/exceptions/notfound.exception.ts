import { NotFoundException } from '@nestjs/common';

export class NotFound extends NotFoundException {
  constructor(error?: string) {
    super(error);
  }
}
