import { UnauthorizedException } from '@nestjs/common';

export class UnauthorizedTokenException extends UnauthorizedException {
  constructor(code: string) {
    super({ message: 'Wrong credentials provided', code });
  }
}
