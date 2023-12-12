import { ApiNumberProperty } from 'common/api-spec/decorator';
import { AbstractEntity } from 'src/entities/abstract.entity/abstract.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Problem extends AbstractEntity<Problem> {
  @ApiNumberProperty(1)
  @PrimaryGeneratedColumn({ name: "problem_id" })
  id: number;

  @Column({ name: "user_id" })
  userId: number;

  @Column()
  topic: string;

  @Column()
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
