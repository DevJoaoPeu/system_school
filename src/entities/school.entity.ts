import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('SCHOOL')
export class SchoolEntity {
  @PrimaryGeneratedColumn('increment', { name: 'ID' })
  id: number;

  @Column({ name: 'NAME' })
  name: string;

  @Column({ name: 'ADDRESS' })
  address: string;

  @Column({ name: 'CITY' })
  city: string;

  @Column({ name: 'STATE' })
  state: string;

  @Column({ default: 1, name: 'FLG_ATIVO' })
  flgAtivo: number;

  @Column({ name: 'FK_USER_HEADMISTRESS' })
  fkUserHeadmistress: number;

  @Column({ name: 'VACANCIES_AVAILABLE' })
  vacanciesAvailable: number;

  @Column({ name: 'SHIFTS' })
  shifts: number;

  @CreateDateColumn({ name: 'CREATED_AT' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'UPDATED_AT' })
  updatedAt: Date;
}
