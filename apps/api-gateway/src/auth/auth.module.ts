import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { BullModule } from '@nestjs/bullmq';
import { LOGIN_USER_QUEUE } from 'libs/shared/constants/queues';

@Module({
  imports: [BullModule.registerQueue({ name: LOGIN_USER_QUEUE })],
  controllers: [AuthController],
})
export class AuthModule {}
