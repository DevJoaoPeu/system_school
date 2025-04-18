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
import { JwtAuthModule } from 'src/security/jwt.auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), JwtAuthModule],
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
