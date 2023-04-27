import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokensService {
  private readonly jwtSecretActivationToken = this.configService.get<string>(
    'JWT_SECRET_ACTIVATION_TOKEN',
  );
  private readonly jwtExpirationTimeActivationToken = this.configService.get<number>(
    'JWT_EXPIRATION_TIME_ACTIVATION_TOKEN',
  );
  private readonly jwtSecretPasswordResetToken = this.configService.get<string>(
    'JWT_SECRET_PASSWORD_RESET_TOKEN',
  );
  private readonly jwtExpirationTimePasswordResetToken = this.configService.get<number>(
    'JWT_EXPIRATION_TIME_PASSWORD_RESET_TOKEN',
  );
  private readonly jwtSecretRefreshToken = this.configService.get<string>(
    'JWT_SECRET_REFRESH_TOKEN',
  );
  private readonly jwtExpirationTimeRefreshToken = this.configService.get<number>(
    'JWT_EXPIRATION_TIME_REFRESH_TOKEN',
  );
  private readonly jwtSecretAuthenticationToken = this.configService.get<string>(
    'JWT_SECRET_AUTHENTICATION_TOKEN',
  );
  private readonly jwtExpirationTimeAuthenticationToken = this.configService.get<number>(
    'JWT_EXPIRATION_TIME_AUTHENTICATION_TOKEN',
  );
  private readonly clientUrl = this.configService.get<string>('CLIENT_URL');

  constructor(private readonly configService: ConfigService) {}
}
