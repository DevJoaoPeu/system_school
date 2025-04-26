import { IsEmail, IsNotEmpty, Min } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: 'O email é obrigatório.' })
  @IsEmail({}, { message: 'O email informado não é válido.' })
  email: string;

  @IsNotEmpty({ message: 'O password é obrigatório.' })
  @Min(6, { message: 'O password deve ter pelo menos 6 caracteres.' })
  password: string;
}
