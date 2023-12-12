import { Entity, Column, BeforeInsert, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { AbstractEntity } from 'src/entities/abstract.entity/abstract.entity';
import { ResultResponse } from 'common/api-spec/type-helper/result-response.helper';
import { ApiNumberProperty } from 'common/api-spec/decorator';

@Entity()
export class User extends AbstractEntity<User> {
  @ApiNumberProperty(1)
  @PrimaryGeneratedColumn({ name: "user_id" })
  id: number;

  @Column({ name: "role_id" })
  roleId: number;

  @Column({ name: "position_id" })
  positionId: number;

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

  @Column()
  phone: string;

  @CreateDateColumn({
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({ default: () => 'CURRENT_TIMESTAMP(6)' })
  updatedAt: Date;

  @DeleteDateColumn({ default: null, nullable: true, })
  deletedAt?: Date;

  @BeforeInsert()
  async hashPasword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}

export class user extends ResultResponse([User]) { }
