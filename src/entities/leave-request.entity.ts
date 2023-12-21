import { BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AbstractEntity } from "./abstract.entity/abstract.entity";
import { LEAVE_DAY_TYPE, LEAVE_STATUS } from "common/enumeration/leave.enum";

@Entity()
export class LeaveRequest extends AbstractEntity<LeaveRequest> {
    @PrimaryGeneratedColumn({ name: "leave_id" })
    id: number;

    @Column({ name: "user_id" })
    userId: number;

    @Column({ name: "leave_type_id" })
    leaveTypeId: number;

    @Column({ unique: true })
    code: string;

    @Column({ name: "start_time" })
    startTime: Date;

    @Column({ name: "start_leave_day_type", type: 'enum', enum: LEAVE_DAY_TYPE })
    startLeaveDayType: string

    @Column({ name: "end_time", nullable: true })
    endTime?: Date;

    @Column({ name: "end_leave_day_type", type: 'enum', enum: LEAVE_DAY_TYPE, nullable: true })
    endLeaveDayType?: string

    @Column({ name: "leave_Duration", type: 'decimal' })
    leaveDuration: number;

    @Column({ name: "leave_reason" })
    leaveReason: string;

    @Column()
    remark: string;

    @Column({
        type: 'enum',
        enum: LEAVE_STATUS,
        default: LEAVE_STATUS.Pending,
    })
    status: string

    @CreateDateColumn({
        default: () => 'CURRENT_TIMESTAMP(6)',
    })
    createdAt: Date;

    @UpdateDateColumn({ default: () => 'CURRENT_TIMESTAMP(6)' })
    updatedAt: Date;

    @DeleteDateColumn({ default: null, nullable: true, })
    deletedAt?: Date;
}
