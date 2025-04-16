import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { USER_SERVICE_INTERFACE } from 'src/shared/interfaces/injection.types';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
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
