import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('DAILY_PRESENCES')
export class DailyPresencesEntity {
  @PrimaryGeneratedColumn('increment', { name: 'ID' })
  id: number;

  @CreateDateColumn({ name: 'DATE_REGISTRATION' })
  dataRegistration: Date;

  @CreateDateColumn({ name: 'CREATED_AT' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'UPDATED_AT' })
  updatedAt: Date;

  @Column({ name: 'FLG_ATIVO', default: 1 })
  flgAtivo: number;

  @Column({ name: 'FK_STUDENT' })
  fkStudent: number;

  @Column({ name: 'DESCRIPTION' })
  description: string;
}
