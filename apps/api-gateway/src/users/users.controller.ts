import { InjectQueue } from '@nestjs/bullmq';
import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  CREATE_USER_QUEUE,
  LIST_ALL_USERS_QUEUE,
} from 'libs/shared/constants/queues';
import { Queue, QueueEvents } from 'bullmq';
import { CreateUserDto } from 'libs/shared/src/dto/create.user.dto';

@Controller('users')
export class UsersController {
  private listAllQueueEvents: QueueEvents;

  constructor(
    @InjectQueue(CREATE_USER_QUEUE)
    private readonly createUserQueue: Queue,

    @InjectQueue(LIST_ALL_USERS_QUEUE)
    private readonly listAllUsersQueue: Queue,
  ) {
    this.listAllQueueEvents = new QueueEvents(LIST_ALL_USERS_QUEUE, {
      connection: this.listAllUsersQueue.opts.connection,
    });
  }

  @Post('/create')
  async create(@Body() dto: CreateUserDto) {
    console.log(dto);
    this.createUserQueue.add(CREATE_USER_QUEUE, dto);
  }

  @Get('/list/all')
  async listAll() {
    const job = await this.listAllUsersQueue.add(
      LIST_ALL_USERS_QUEUE,
      {},
      {
        removeOnComplete: true,
        removeOnFail: true,
      },
    );

    return await job.waitUntilFinished(this.listAllQueueEvents);
  }
}
