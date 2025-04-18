import { PayloadInterface } from 'src/security/interfaces/payload.interface';

export interface IJwtAuthService {
  signAsync(payload: PayloadInterface): Promise<string>;
}
