import { IsEmail, IsEnum, IsNotEmpty, Length } from 'class-validator';
import { IsCPF } from 'class-validator-cpf';
import { TypeUserPermissionEnum } from '../../enums/type.user.permission';

export class CreateUserDto {
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @Length(2, 50, { message: 'O nome deve ter entre 2 e 50 caracteres.' })
  name: string;

  @IsNotEmpty({ message: 'O sobrenome é obrigatório.' })
  @Length(2, 50, { message: 'O sobrenome deve ter entre 2 e 50 caracteres.' })
  surname: string;

  @IsNotEmpty({ message: 'O email é obrigatório.' })
  @IsEmail({}, { message: 'O email informado não é válido.' })
  email: string;

  @IsNotEmpty({ message: 'O password é obrigatório.' })
  password: string;

  @IsNotEmpty({ message: 'O tipo do usuário é obrigatório.' })
  @IsEnum(TypeUserPermissionEnum, {
    message: 'O tipo de usuário informado não é válido.',
  })
  typeUser: TypeUserPermissionEnum;

  @IsNotEmpty({ message: 'O CPF é obrigatório.' })
  @IsCPF({ message: 'O CPF informado não é válido.' })
  cpf: string;
}
