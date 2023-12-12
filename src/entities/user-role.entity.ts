import { ApiNumberProperty } from 'common/api-spec/decorator';
import { AbstractEntity } from 'src/entities/abstract.entity/abstract.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class UserRole extends AbstractEntity<UserRole> {
  @ApiNumberProperty(1)
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  roleId: number;

  @CreateDateColumn({
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({ default: () => 'CURRENT_TIMESTAMP(6)' })
  updatedAt: Date;

  @DeleteDateColumn({ default: null, nullable: true, })
  deletedAt?: Date;
}
