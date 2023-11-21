import { AbstractEntity } from 'src/database/abstract.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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
