import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { AbstractEntity } from "./abstract.entity/abstract.entity";
import { ApiNumberProperty } from "common/api-spec/decorator";

@Entity()
export class WorkFlowStatus extends AbstractEntity<WorkFlowStatus>{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    index: number

    @Column()
    work_flow_code: string

    @Column()
    resultStatus: string

    @Column({ nullable: true })
    backward?: string

    @Column({ nullable: true })
    nextStep?: string
}