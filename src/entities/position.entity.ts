import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class Position {
    @PrimaryGeneratedColumn({ name: "position_id" })
    id: number;

    @Column()
    name: string;

    @Column()
    name_local: string;

    @CreateDateColumn({
        default: () => 'CURRENT_TIMESTAMP(6)',
    })
    createdAt: Date;

    @UpdateDateColumn({ default: () => 'CURRENT_TIMESTAMP(6)' })
    updatedAt: Date;

    @DeleteDateColumn({ default: null, nullable: true, })
    deletedAt?: Date;
}
