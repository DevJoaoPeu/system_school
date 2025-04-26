import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { UserEntity } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectQueue } from '@nestjs/bullmq';
import { LOGIN_USER_QUEUE } from 'libs/shared/constants/queues';
import { Job, Queue, Worker } from 'bullmq';
import { LoginDto } from '@app/shared/dto/auth/login.dto';

@Injectable()
export class AuthProcessor implements OnModuleInit, OnModuleDestroy {
  private logger: Logger = new Logger(AuthProcessor.name);
  private workers: Worker[] = [];

  @InjectRepository(UserEntity)
  private readonly userRepository: Repository<UserEntity>;

  constructor(
    @InjectQueue(LOGIN_USER_QUEUE) private readonly loginUserQueue: Queue,
  ) {}

  onModuleDestroy() {}

  onModuleInit() {
    this.initializeWorkers();
  }

  private async initializeWorkers() {
    this.workers = [this.loginUserWorker()];
  }

  private loginUserWorker(): Worker {
    const worker = new Worker(
      LOGIN_USER_QUEUE,
      async (job: Job<LoginDto>) => {
        const { email, password } = job.data;
      },
      {
        connection: this.loginUserQueue.opts.connection,
      },
    );

    return worker;
  }
}
