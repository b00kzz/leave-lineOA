import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Userdetail } from './userdetail.entity';
// import * as bcrypt from 'bcrypt';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  isActive: boolean;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @Column({ nullable: true })
  updatedBy?: string;

  @OneToOne(() => Userdetail, (userDetail) => userDetail.user) // specify inverse side as a second parameter
  @JoinColumn()
  userDetail: Userdetail;

  // @BeforeInsert()
  // async hashPasword() {
  //   this.password = await bcrypt.hash(this.password, 10);
  // }
}
