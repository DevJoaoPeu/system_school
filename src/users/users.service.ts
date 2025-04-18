import { BadRequestException, Inject, Injectable } from '@nestjs/common';
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
import { JwtAuthService } from 'src/security/jwt.auth.service';
import { JwtService } from '@nestjs/jwt';
import { JWT_AUTH_SERVICE_INTERFACE } from 'src/shared/interfaces/injection.types';
import { IJwtAuthService } from 'src/shared/interfaces/jwt.auth.service.interface';
import { PayloadInterface } from 'src/security/interfaces/payload.interface';

@Injectable()
export class UsersService implements IUserService {
  @InjectRepository(UserEntity)
  private readonly userRepository: Repository<UserEntity>;

  @Inject(JWT_AUTH_SERVICE_INTERFACE)
  private readonly jwtAuthService: IJwtAuthService;

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
      throw new BadRequestException('O CPF informado já está cadastrado');
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

    const payload: PayloadInterface = {
      sub: user.id,
      username: user.name,
      email: user.email,
    };

    const acessToken: string = await this.jwtAuthService.signAsync(payload);

    return {
      acessToken,
    };
  }
}
