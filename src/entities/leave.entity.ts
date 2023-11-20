import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Leave {
  @PrimaryGeneratedColumn()
  id: number;

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

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @Column({ nullable: true })
  updatedBy?: string;
}
