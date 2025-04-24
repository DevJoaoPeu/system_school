import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { BullModule } from '@nestjs/bullmq';
import {
  CREATE_USER_QUEUE,
  LIST_ALL_USERS_QUEUE,
} from 'libs/shared/constants/queues';

@Module({
  imports: [
    BullModule.registerQueue(
      { name: CREATE_USER_QUEUE },
      { name: LIST_ALL_USERS_QUEUE },
    ),
  ],
  controllers: [UsersController],
})
export class UsersModule {}
