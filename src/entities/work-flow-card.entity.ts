import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { AbstractEntity } from "./abstract.entity/abstract.entity";

@Entity()
export class WorkFlowCard extends AbstractEntity<WorkFlowCard>{
    @PrimaryGeneratedColumn()
    id: number

    @Column({ name: "leave_id" })
    leaveId: number

    @Column()
    work_flow_type: string

    @Column()
    work_flow_code: string

    @Column({ name: "user_id" })
    userId: number
}
