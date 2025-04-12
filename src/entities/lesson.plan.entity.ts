import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('LESSON_PLAN')
export class LessonPlanEntity {
  @PrimaryGeneratedColumn('increment', { name: 'ID' })
  id: number;

  @CreateDateColumn({ name: 'DATE_REGISTRATION' })
  dateRegistration: Date;

  @CreateDateColumn({ name: 'CREATED_AT' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'UPDATED_AT' })
  updatedAt: Date;

  @Column({ name: 'DESCRIPTION' })
  description: string;

  @Column({ name: 'FK_USER_TEACHER' })
  fkUserTeacher: number;

  @Column({ name: 'FLG_ATIVO', default: 1 })
  flgAtivo: number;
}
