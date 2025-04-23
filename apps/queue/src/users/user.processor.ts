import { InjectQueue } from '@nestjs/bullmq';
import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { CREATE_USER_QUEUE } from 'libs/shared/constants/queues';
import { Job, Queue, Worker } from 'bullmq';
import { CreateUserDto } from 'libs/shared/src/dto/create.user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserProcessor implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(UserProcessor.name);
  private worker: Worker;

  @InjectRepository(UserEntity)
  private readonly userRepository: Repository<UserEntity>;

  constructor(
    @InjectQueue(CREATE_USER_QUEUE) private readonly createUserQueue: Queue,
  ) {}

  onModuleInit() {
    this.worker = new Worker(
      CREATE_USER_QUEUE,
      async (job: Job<CreateUserDto & { id: number }>) => {
        console.log(job.data);
        this.logger.log(`Receve event: ${job.name}: ${job.data}`);
      },
      {
        connection: this.createUserQueue.opts.connection,
      },
    );
  }

  async onModuleDestroy() {
    await this.worker.close();
  }

  async createUser(user: CreateUserDto): Promise<void> {
    await this.userRepository.save(user);
  }
}
