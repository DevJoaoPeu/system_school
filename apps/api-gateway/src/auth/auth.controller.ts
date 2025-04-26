import { EventLoginDto } from '@app/shared/dto/auth/event.login.dto';
import { LoginDto } from '@app/shared/dto/auth/login.dto';
import { InjectQueue } from '@nestjs/bullmq';
import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { Queue, QueueEvents } from 'bullmq';
import { LOGIN_USER_QUEUE } from 'libs/shared/constants/queues';

@Controller('auth')
export class AuthController {
  private logger = new Logger(AuthController.name);
  private loginUserQueueEvent: QueueEvents;

  constructor(
    @InjectQueue(LOGIN_USER_QUEUE)
    private readonly loginUserQueue: Queue,
  ) {
    this.loginUserQueueEvent = new QueueEvents(LOGIN_USER_QUEUE, {
      connection: this.loginUserQueue.opts.connection,
    });
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const job = await this.loginUserQueue.add(LOGIN_USER_QUEUE, dto);

    const event: EventLoginDto = await job.waitUntilFinished(
      this.loginUserQueueEvent,
    );

    if (event.loginIsValid) {
      return UnauthorizedException('Login invalid');
    }

    return { acessToken: event.acessToken };
  }
}
