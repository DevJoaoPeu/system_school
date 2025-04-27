import { Module } from '@nestjs/common';
import { AuthProcessor } from './auth.processor';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { BullModule } from '@nestjs/bullmq';
import { LOGIN_USER_QUEUE } from 'libs/shared/constants/queues';
import { SecurityJwtService } from '../security-jwt/security-jwt.service';
import { SecurityJwtModule } from '../security-jwt/security-jwt.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    BullModule.registerQueue({
      name: LOGIN_USER_QUEUE,
    }),
    SecurityJwtModule,
  ],
  providers: [AuthProcessor],
})
export class AuthModule {}
