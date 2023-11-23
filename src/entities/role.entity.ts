import { AbstractEntity } from 'src/entities/abstract.entity/abstract.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Role extends AbstractEntity<Role> {
  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  nameLocal: string;
}
