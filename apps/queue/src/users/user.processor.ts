import { InjectQueue } from '@nestjs/bullmq';
import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import {
  CREATE_USER_QUEUE,
  LIST_ALL_USERS_QUEUE,
  LIST_ONE_USER_QUEUE,
} from 'libs/shared/constants/queues';
import { Job, Queue, Worker } from 'bullmq';
import { CreateUserDto } from '@app/shared/dto/user/create.user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserProcessor implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(UserProcessor.name);
  private workers: Worker[] = [];

  @InjectRepository(UserEntity)
  private readonly userRepository: Repository<UserEntity>;

  constructor(
    @InjectQueue(CREATE_USER_QUEUE) private readonly createUserQueue: Queue,
    @InjectQueue(LIST_ALL_USERS_QUEUE)
    private readonly listAllUsersQueue: Queue,
    @InjectQueue(LIST_ONE_USER_QUEUE)
    private readonly listOneUserQueue: Queue,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.initializeWorkers();
  }

  async onModuleDestroy(): Promise<void> {
    await this.closeWorkers();
  }

  private async initializeWorkers(): Promise<void> {
    this.workers = [
      this.createUserWorker(),
      this.listAllUsersWorker(),
      this.listOneUserWorker(),
    ];
  }

  private listOneUserWorker(): Worker {
    const worker = new Worker(
      LIST_ONE_USER_QUEUE,
      async (job: Job<{ id: number }>) => {
        return this.userRepository.findOne({
          where: { id: job.data.id },
        });
      },
      {
        connection: this.listOneUserQueue.opts.connection,
      },
    );

    return worker;
  }

  private createUserWorker(): Worker {
    const worker = new Worker(
      CREATE_USER_QUEUE,
      async (job: Job<CreateUserDto>) => {
        this.userRepository.save(job.data);
      },
      {
        connection: this.createUserQueue.opts.connection,
      },
    );

    return worker;
  }

  private listAllUsersWorker(): Worker {
    const worker = new Worker(
      LIST_ALL_USERS_QUEUE,
      async (job: Job) => {
        return this.userRepository.find();
      },
      {
        connection: this.listAllUsersQueue.opts.connection,
      },
    );

    return worker;
  }

  private async closeWorkers(): Promise<void> {
    await Promise.all(this.workers.map((worker) => worker.close()));
    this.logger.log('All workers closed successfully');
  }
}
