import { RegisterDto } from './register.dto';

import { LoginRequest } from '../../types';

export class LoginDto extends RegisterDto implements LoginRequest {}
