import { AbstractEntity } from 'src/database/abstract.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class UserTeam extends AbstractEntity<UserTeam> {
  @Column()
  userId: number;

  @Column()
  teamId: number;
}
