import { AbstractEntity } from 'src/entities/abstract.entity/abstract.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Problem extends AbstractEntity<Problem> {
  @Column()
  topic: string;

  @Column()
  problem: string;
}
