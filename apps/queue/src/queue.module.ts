import { SharedModule } from '@app/shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { Module } from '@nestjs/common';
import { SecurityJwtModule } from './security-jwt/security-jwt.module';
@Module({
  imports: [AuthModule, UsersModule, SharedModule, SecurityJwtModule],
  providers: [],
})
export class QueueModule {}
