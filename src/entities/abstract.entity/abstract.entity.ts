import { ApiNumberProperty } from 'common/api-spec/decorator';
import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class AbstractEntity<T> {
  @ApiNumberProperty(1)
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ default: null, nullable: true })
  deletedAt?: Date;

  constructor(entity: Partial<T>) {
    Object.assign(this, entity);
  }
}
