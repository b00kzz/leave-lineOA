import { AbstractEntity } from 'src/entities/abstract.entity/abstract.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class LeaveType extends AbstractEntity<LeaveType> {
  @Column()
  ltTopic: string;

  @Column()
  ltTime: string;

  @Column()
  ltTotal: number;
}
