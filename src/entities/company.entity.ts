import { AbstractEntity } from 'src/entities/abstract.entity/abstract.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Company extends AbstractEntity<Company> {
  @Column()
  comopName: string;

  @Column()
  bu: string;

  @Column()
  agency: string;

  @Column()
  positon: string;
}
