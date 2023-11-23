import { TEAM_STATUS } from 'common/enumeration/team.enum';
import { AbstractEntity } from 'src/entities/abstract.entity/abstract.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Team extends AbstractEntity<Team> {
  @Column({ default: 0 })
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
}
