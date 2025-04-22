import { InjectQueue } from '@nestjs/bullmq';
import { Controller, Post } from '@nestjs/common';
import { CREATE_USER_QUEUE } from './constants/queues';
import { Queue } from 'bullmq';
import { CreateUserDto } from './dto/create.user.dto';

@Controller('users')
export class UsersController {
  constructor(
    @InjectQueue(CREATE_USER_QUEUE)
    private readonly createUserQueue: Queue,
  ) {}

  @Post('/create')
  async create(dto: CreateUserDto) {
    this.createUserQueue.add(CREATE_USER_QUEUE, dto);
  }
}
