import { AbstractEntity } from 'src/database/abstract.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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
