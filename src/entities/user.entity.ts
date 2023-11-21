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
import * as bcrypt from 'bcryptjs';
import { AbstractEntity } from 'src/database/abstract.entity';

@Entity()
export class User extends AbstractEntity<User> {
  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column({ nullable: true })
  middleName: string;

  @Column()
  lastName: string;

  @Column()
  firstNameLocal: string;

  @Column({ nullable: true })
  middleNameLocal: string;

  @Column()
  lastNameLocal: string;

  @Column({ default: false })
  isActive: boolean;

  @BeforeInsert()
  async hashPasword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
