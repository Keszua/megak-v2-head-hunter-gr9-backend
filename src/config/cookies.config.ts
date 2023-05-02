import * as dotenv from 'dotenv';
import { CookieOptions } from 'express';

dotenv.config();

export const cookiesOptions: CookieOptions = {
  maxAge: 0,
  secure: Boolean(process.env.COOKIE_SECURE),
  domain: process.env.APP_HOSTNAME,
  httpOnly: true,
};
