import { SharedModule } from '@app/shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { Module } from '@nestjs/common';
@Module({
  imports: [AuthModule, UsersModule, SharedModule],
  providers: [],
})
export class QueueModule {}
