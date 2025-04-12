import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity('PERMISSIONS_X_SCHOOLS')
export class PermissionsXSchoolsEntity {
  @PrimaryGeneratedColumn('increment', { name: 'ID' })
  id: number;

  @Column({ name: 'FK_SCHOOL' })
  fkSchool: number;

  @Column({ name: 'FK_USER' })
  fkUser: number;

  @Column({ name: 'FLG_ATIVO', default: 1 })
  flgAtivo: number;
}
