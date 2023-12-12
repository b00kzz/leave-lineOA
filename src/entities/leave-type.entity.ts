import { ApiNumberProperty } from 'common/api-spec/decorator';
import { AbstractEntity } from 'src/entities/abstract.entity/abstract.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class LeaveType extends AbstractEntity<LeaveType> {
  @ApiNumberProperty(1)
  @PrimaryGeneratedColumn({ name: 'leave_type_id' })
  id: number;


  @Column()
  name: string;

  @Column()
  nameLocal: string;

  @Column({ comment: "รายละเอียด" })
  description: string;

  @Column()
  icon: string;

  @Column()
  colour: string;

  @CreateDateColumn({
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({ default: () => 'CURRENT_TIMESTAMP(6)' })
  updatedAt: Date;

  @DeleteDateColumn({ default: null, nullable: true, })
  deletedAt?: Date;
}
