import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {
  JWT_AUTH_SERVICE_INTERFACE,
  USER_SERVICE_INTERFACE,
} from 'src/shared/interfaces/injection.types';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthService } from 'src/security/jwt.auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [
    {
      provide: USER_SERVICE_INTERFACE,
      useClass: UsersService,
    },
    {
      provide: JWT_AUTH_SERVICE_INTERFACE,
      useClass: JwtAuthService,
    },
  ],
  exports: [],
})
export class UsersModule {}
