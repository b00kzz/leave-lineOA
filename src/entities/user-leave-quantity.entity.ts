import { ApiNumberProperty } from "common/api-spec/decorator";
import { AbstractEntity } from "./abstract.entity/abstract.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class UserLeaveQuantity extends AbstractEntity<UserLeaveQuantity>{
    @ApiNumberProperty(1)
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "user_id" })
    userId: number;

    @Column({ name: "leave_type_id" })
    leaveTypeId: number;

    @Column({ type: 'decimal' })
    quantity: number;

    @Column()
    startTime: Date;

    @Column()
    endTime: Date;

    @CreateDateColumn({
        default: () => 'CURRENT_TIMESTAMP(6)',
    })
    createdAt: Date;

    @UpdateDateColumn({ default: () => 'CURRENT_TIMESTAMP(6)' })
    updatedAt: Date;

    @DeleteDateColumn({ default: null, nullable: true, })
    deletedAt?: Date;
}
