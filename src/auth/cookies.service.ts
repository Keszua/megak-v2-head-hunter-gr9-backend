import { Injectable } from '@nestjs/common';
import { CookieOptions } from 'express';
import { Response } from 'express';

import { cookiesOptions } from '../config';
import { CookiesNames, TokenData } from '../types';

@Injectable()
export class CookiesService {
  setTokenInCookie(
    res: Response,
    name: CookiesNames,
    tokenData: TokenData,
    additionalOptions?: CookieOptions,
  ): Response {
    return res.cookie(name, tokenData.token, {
      ...cookiesOptions,
      maxAge: tokenData.expiresIn * 1000,
      ...additionalOptions,
    });
  }

  clearCookie(res: Response, name: CookiesNames, additionalOptions?: CookieOptions): void {
    res.clearCookie(name, {
      ...cookiesOptions,
      ...additionalOptions,
    });
  }
}
