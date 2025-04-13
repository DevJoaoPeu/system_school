import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import {
  IReturnMethodCreate,
  IUserService,
} from 'src/shared/interfaces/users.service.interface';
import { USER_SERVICE_INTERFACE } from 'src/shared/interfaces/injection.types';

@Controller('users/')
export class UsersController {
  @Inject(USER_SERVICE_INTERFACE)
  private readonly userService: IUserService;

  @Post('create')
  create(@Body dto: CreateUserDto): IReturnMethodCreate {
    return this.userService.create(dto);
  }
}
