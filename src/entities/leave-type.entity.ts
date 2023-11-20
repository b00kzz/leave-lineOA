import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class LeaveType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ltTopic: string;

  @Column()
  ltTime: string;

  @Column()
  ltTotal: number;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @Column({ nullable: true })
  updatedBy?: string;
}
