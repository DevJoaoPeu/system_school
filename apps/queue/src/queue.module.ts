import { Module } from '@nestjs/common';
import { UserProcessor } from './users/user.processor';
import { BullModule } from '@nestjs/bullmq';
import { SharedModule } from '@app/shared/shared.module';
import {
  CREATE_USER_QUEUE,
  LIST_ALL_USERS_QUEUE,
  LIST_ONE_USER_QUEUE,
} from 'libs/shared/constants/queues';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    SharedModule,
    BullModule.registerQueue(
      { name: CREATE_USER_QUEUE },
      { name: LIST_ALL_USERS_QUEUE },
      { name: LIST_ONE_USER_QUEUE },
    ),
  ],
  providers: [UserProcessor],
})
export class QueueModule {}
