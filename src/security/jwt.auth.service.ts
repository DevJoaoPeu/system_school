import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PayloadInterface } from './interfaces/payload.interface';
import { IJwtAuthService } from 'src/shared/interfaces/jwt.auth.service.interface';

@Injectable()
export class JwtAuthService implements IJwtAuthService {
  private readonly jwt: JwtService;

  async signAsync(payload: PayloadInterface): Promise<string> {
    return await this.jwt.signAsync(payload);
  }
}
