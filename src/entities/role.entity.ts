import { ApiNumberProperty } from 'common/api-spec/decorator';
import { AbstractEntity } from 'src/entities/abstract.entity/abstract.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Role extends AbstractEntity<Role> {
  @ApiNumberProperty(1)
  @PrimaryGeneratedColumn({ name: 'role_id' })
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  nameLocal: string;

  @Column({ length: 255 })
  description: string;

  @CreateDateColumn({
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({ default: () => 'CURRENT_TIMESTAMP(6)' })
  updatedAt: Date;

  @DeleteDateColumn({ default: null, nullable: true, })
  deletedAt?: Date;
}
