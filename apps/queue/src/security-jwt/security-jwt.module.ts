import { Module } from '@nestjs/common';
import { SecurityJwtService } from './security-jwt.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'seuSegredoUltraSecreto',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [SecurityJwtService],
  exports: [SecurityJwtService],
})
export class SecurityJwtModule {}
