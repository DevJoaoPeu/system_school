import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('STUDENT')
export class StudentEntity {
  @PrimaryGeneratedColumn('increment', { name: 'ID' })
  id: number;

  @Column({ name: 'NAME' })
  name: string;

  @Column({ name: 'SURNAME' })
  surname: string;

  @Column({ name: 'CPF', unique: true })
  cpf: string;

  @Column({ name: 'EMAIL', unique: true })
  email: string;

  @Column({ name: 'DATE_BIRTH' })
  dateBirth: Date;

  @CreateDateColumn({ name: 'DATE_REGISTRATION' })
  dateRegistration: Date;

  @CreateDateColumn({ name: 'CREATED_AT' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'UPDATED_AT' })
  updatedAt: Date;

  @Column({ name: 'FLG_ATIVO', default: 1 })
  flgAtivo: number;

  @Column({ name: 'FK_SCHOOL' })
  fkSchool: number;
}
