import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { BullModule } from '@nestjs/bullmq';
import { CREATE_USER_QUEUE } from '../../../../libs/shared/constants/queues';

@Module({
  imports: [BullModule.registerQueue({ name: CREATE_USER_QUEUE })],
  controllers: [UsersController],
})
export class UsersModule {}
