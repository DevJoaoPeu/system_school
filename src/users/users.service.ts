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
import { hashSync } from 'bcrypt';

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

    const userExists: boolean =
      (
        await this.userRepository.find({
          where: { email },
        })
      ).length > 0;

    if (userExists) {
      throw new BadRequestException('O email informado já está cadastrado.');
    }

    const cpfExists: boolean =
      (
        await this.userRepository.find({
          where: { cpf },
        })
      ).length > 0;

    if (cpfExists) {
      throw new BadRequestException('O cpf informado já está cadastrado');
    }

    const encriptedPassword: string = hashSync(password, 10);

    const user: UserEntity = await this.userRepository.create({
      name,
      surname,
      email,
      password: encriptedPassword,
      typeUser,
      cpf,
    });

    await this.userRepository.save(user);

    return {
      acessToken: 'token',
    };
  }
}
