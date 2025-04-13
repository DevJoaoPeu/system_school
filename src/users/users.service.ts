import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import {
  IReturnMethodCreate,
  IUserService,
} from 'src/shared/interfaces/users.service.interface';

@Injectable()
export class UsersService implements IUserService {
  create(dto: CreateUserDto): IReturnMethodCreate {
    const acessToken: string = 'token';

    return { acessToken };
  }
}
