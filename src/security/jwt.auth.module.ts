import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtAuthService } from './jwt.auth.service';
import { JWT_AUTH_SERVICE_INTERFACE } from 'src/shared/interfaces/injection.types';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [
    {
      provide: JWT_AUTH_SERVICE_INTERFACE,
      useClass: JwtAuthService,
    },
  ],
  exports: [
    {
      provide: JWT_AUTH_SERVICE_INTERFACE,
      useClass: JwtAuthService,
    },
  ],
})
export class JwtAuthModule {}
