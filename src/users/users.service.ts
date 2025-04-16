import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import {
  IReturnMethodCreate,
  IUserService,
} from 'src/shared/interfaces/users.service.interface';
import { cpf as libCpf } from 'cpf-cnpj-validator';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService implements IUserService {
  @InjectRepository(UserEntity)
  private readonly userRepository: Repository<UserEntity>;

  async create(dto: CreateUserDto): Promise<IReturnMethodCreate> {
    const { name, surname, email, password, typeUser, cpf } = dto;

    const formattedCpf: string = libCpf.format(cpf);
    const isValid: boolean = libCpf.isValid(formattedCpf);

    if (!isValid) {
      throw new BadRequestException('O CPF informado é inválido.');
    }

    const user: UserEntity = await this.userRepository.create({
      name,
      surname,
      email,
      password,
      typeUser,
      cpf: formattedCpf,
    });

    await this.userRepository.save(user);

    return {
      acessToken: 'token',
    };
  }
}
