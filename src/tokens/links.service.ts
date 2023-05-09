import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { TokensService } from './tokens.service';

import { StudentEntity, StudentWithActivationLink, TokenData, TokenOptions } from '../types';
import { User } from '../users/entities/user.entity';

@Injectable()
export class LinksService {
  private readonly clientUrl = this.configService.get<string>('CLIENT_URL');
  constructor(
    private readonly tokensService: TokensService,
    private readonly configService: ConfigService,
  ) {}

  private generateTokenLink(token: string, options: TokenOptions): string {
    const { tokenType } = options;
    return `${this.clientUrl}/${tokenType}/${token}`;
  }

  async createActivationLink(user: User): Promise<string> {
    const tokenData: TokenData = await this.tokensService.createToken(user, {
      tokenType: 'activation',
    });
    return this.generateTokenLink(tokenData.token, { tokenType: 'activation' });
  }

  async createActivationLinksForStudents(
    students: StudentEntity[],
  ): Promise<StudentWithActivationLink[]> {
    const studentsWithActivationLinks: StudentWithActivationLink[] = [];
    const users = students.map(student => student.user) as User[];
    const promises = users.map(async user => {
      const activationLink = await this.createActivationLink(user);
      studentsWithActivationLinks.push({ email: user.email, activationLink });
    });
    await Promise.all(promises);
    return studentsWithActivationLinks;
  }
}
