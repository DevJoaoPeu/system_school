import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { USER_SERVICE_INTERFACE } from 'src/shared/interfaces/injection.types';

@Module({
  controllers: [UsersController],
  providers: [
    {
      provide: USER_SERVICE_INTERFACE,
      useClass: UsersService,
    },
  ],
  exports: [],
})
export class UsersModule {}
