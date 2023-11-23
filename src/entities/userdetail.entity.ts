import { Column, Entity } from 'typeorm';
import { AbstractEntity } from 'src/entities/abstract.entity/abstract.entity';

@Entity()
export class Userdetail extends AbstractEntity<Userdetail> {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  userImage: string;
}
