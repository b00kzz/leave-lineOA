import { AbstractEntity } from 'src/entities/abstract.entity/abstract.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Leave extends AbstractEntity<Leave> {
  @Column()
  leaveStatus: string;

  @Column()
  leaveDesc: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  totalDate: number;

  @Column()
  leaveImage: string;
}
