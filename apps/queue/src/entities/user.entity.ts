import { TypeUserPermissionEnum } from 'libs/shared/enums/type.user.permission';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('USERS')
export class UserEntity {
  @PrimaryGeneratedColumn('increment', { name: 'ID' })
  id: number;

  @Column({ name: 'NAME' })
  name: string;

  @Column({ name: 'SURNAME' })
  surname: string;

  @CreateDateColumn({ name: 'CREATED_AT' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'UPDATED_AT' })
  updatedAt: Date;

  @Column({
    type: 'enum',
    enum: TypeUserPermissionEnum,
    name: 'TYPE_USER',
  })
  typeUser: TypeUserPermissionEnum;

  @Column({ unique: true, name: 'EMAIL' })
  email: string;

  @Column({ unique: true, name: 'CPF' })
  cpf: string;

  @Column({ name: 'PASSWORD' })
  password: string;

  @Column({ default: 1, name: 'FLG_ATIVO' })
  flgAtivo: number;
}
