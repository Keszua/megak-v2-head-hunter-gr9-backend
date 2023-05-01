import { UserResponse } from './types';

declare global {
  namespace Express {
    interface Request {
      user?: UserResponse;
    }
  }
}
