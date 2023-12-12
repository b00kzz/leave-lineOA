import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AbstractEntity } from "./abstract.entity/abstract.entity";
import { ApiNumberProperty } from "common/api-spec/decorator";

@Entity()
export class Holiday extends AbstractEntity<Holiday> {
    @ApiNumberProperty(1)
    @PrimaryGeneratedColumn({ name: 'holiday_id' })
    id: number;

    @Column()
    date: Date;

    @Column()
    name: string;

    @Column()
    nameLocal: string;

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
