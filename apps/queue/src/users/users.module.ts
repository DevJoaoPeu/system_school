import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import {
  CREATE_USER_QUEUE,
  LIST_ALL_USERS_QUEUE,
  LIST_ONE_USER_QUEUE,
} from 'libs/shared/constants/queues';
import { BullModule } from '@nestjs/bullmq';
import { SharedModule } from '@app/shared/shared.module';
import { UserProcessor } from './user.processor';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    BullModule.registerQueue(
      { name: CREATE_USER_QUEUE },
      { name: LIST_ALL_USERS_QUEUE },
      { name: LIST_ONE_USER_QUEUE },
    ),
  ],
  providers: [UserProcessor],
})
export class UsersModule {}
