import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SharedModule } from '@app/shared/shared.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, SharedModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
