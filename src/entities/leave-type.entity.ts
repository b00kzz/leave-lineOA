import { AbstractEntity } from 'src/database/abstract.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class LeaveType extends AbstractEntity<LeaveType> {
  @Column()
  ltTopic: string;

  @Column()
  ltTime: string;

  @Column()
  ltTotal: number;
}
