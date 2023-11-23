import { AbstractEntity } from 'src/entities/abstract.entity/abstract.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class UserRole extends AbstractEntity<UserRole> {
  @Column()
  userId: number;

  @Column()
  roleId: number;
}
