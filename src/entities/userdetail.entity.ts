import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Userdetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  userImage: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @Column({ nullable: true })
  updatedBy?: string;

  @OneToOne(() => User, (user) => user.userDetail) // กำหนดความสัมพันธ์ OneToOne และระบุคีย์ต่าง ๆ ที่ใช้เชื่อมโยง
  user: User;
}
