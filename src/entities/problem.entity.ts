import { AbstractEntity } from 'src/database/abstract.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Problem extends AbstractEntity<Problem> {
  @Column()
  topic: string;

  @Column()
  problem: string;
}
