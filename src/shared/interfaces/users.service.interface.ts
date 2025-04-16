import { CreateUserDto } from 'src/users/dto/create.user.dto';

export interface IUserService {
  create(dto: CreateUserDto): Promise<IReturnMethodCreate>;
}

export interface IReturnMethodCreate {
  acessToken: string;
}
