import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PayloadJwtDto } from './dto/payload.jwt..dto';

@Injectable()
export class SecurityJwtService {
  constructor(private readonly jwtService: JwtService) {}

  sign(payload: PayloadJwtDto): string {
    return this.jwtService.sign(payload);
  }

  verify(token: string) {
    return this.jwtService.verify(token);
  }
}
