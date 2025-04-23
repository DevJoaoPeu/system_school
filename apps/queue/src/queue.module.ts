import { Module } from '@nestjs/common';
import { UserProcessor } from './users/user.processor';
import { BullModule } from '@nestjs/bullmq';
import { SharedModule } from '@app/shared/shared.module';
import { CREATE_USER_QUEUE } from 'libs/shared/constants/queues';

@Module({
  imports: [
    SharedModule,
    BullModule.registerQueue({ name: CREATE_USER_QUEUE }),
  ],
  providers: [UserProcessor],
})
export class QueueModule {}
