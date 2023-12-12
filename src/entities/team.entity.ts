import { ApiNumberProperty } from 'common/api-spec/decorator';
import { TEAM_STATUS } from 'common/enumeration/team.enum';
import { AbstractEntity } from 'src/entities/abstract.entity/abstract.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Team extends AbstractEntity<Team> {
  @ApiNumberProperty(1)
  @PrimaryGeneratedColumn({ name: "team_id" })
  id: number;

  @Column({ default: 0, name: "main_team_id" })
  mainTeamId: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  nameLocal: string;

  @Column({ nullable: true, length: 255 })
  description?: string;

  @Column({
    type: 'enum',
    enum: TEAM_STATUS,
    default: TEAM_STATUS.ACTIVE,
  })
  status: string; //inactive || active

  @CreateDateColumn({
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({ default: () => 'CURRENT_TIMESTAMP(6)' })
  updatedAt: Date;

  @DeleteDateColumn({ default: null, nullable: true, })
  deletedAt?: Date;
}
