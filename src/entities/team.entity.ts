import { AbstractEntity } from 'src/database/abstract.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Team extends AbstractEntity<Team> {
  @Column({ default: 0 })
  mainTeamId: number;

  @Column()
  name: string;

  @Column()
  nameLocal: string;

  @Column({ nullable: true })
  description?: string;

  @Column()
  status: string; //inactive || active
}
