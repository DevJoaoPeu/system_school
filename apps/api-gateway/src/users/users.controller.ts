import { InjectQueue } from '@nestjs/bullmq';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  CREATE_USER_QUEUE,
  LIST_ALL_USERS_QUEUE,
  LIST_ONE_USER_QUEUE,
} from 'libs/shared/constants/queues';
import { Queue, QueueEvents } from 'bullmq';
import { CreateUserDto } from 'libs/shared/src/dto/create.user.dto';
import { UserDto } from '@app/shared/dto/user.dto';

@Controller('users')
export class UsersController {
  private listAllQueueEvents: QueueEvents;
  private listOneUserQueueEvents: QueueEvents;

  constructor(
    @InjectQueue(CREATE_USER_QUEUE)
    private readonly createUserQueue: Queue,

    @InjectQueue(LIST_ALL_USERS_QUEUE)
    private readonly listAllUsersQueue: Queue,

    @InjectQueue(LIST_ONE_USER_QUEUE)
    private readonly listOneUserQueue: Queue,
  ) {
    this.listAllQueueEvents = new QueueEvents(LIST_ALL_USERS_QUEUE, {
      connection: this.listAllUsersQueue.opts.connection,
    });

    this.listOneUserQueueEvents = new QueueEvents(LIST_ONE_USER_QUEUE, {
      connection: this.listOneUserQueue.opts.connection,
    });
  }

  @Post('/create')
  async create(@Body() dto: CreateUserDto): Promise<{ message: string }> {
    this.createUserQueue.add(CREATE_USER_QUEUE, dto);

    return { message: 'User created successfully' };
  }

  @Get('/list/all')
  async listAll(): Promise<UserDto[]> {
    const job = await this.listAllUsersQueue.add(LIST_ALL_USERS_QUEUE, {});

    return await job.waitUntilFinished(this.listAllQueueEvents);
  }

  @Get('/list/one/:id')
  async listOne(@Param('id') id: string): Promise<UserDto> {
    const job = await this.listOneUserQueue.add(LIST_ONE_USER_QUEUE, {
      id: +id,
    });

    return await job.waitUntilFinished(this.listOneUserQueueEvents);
  }
}
