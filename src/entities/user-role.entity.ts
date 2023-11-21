import { AbstractEntity } from 'src/database/abstract.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class UserRole extends AbstractEntity<UserRole> {
  @Column()
  userId: number;

  @Column()
  roleId: number;
}
