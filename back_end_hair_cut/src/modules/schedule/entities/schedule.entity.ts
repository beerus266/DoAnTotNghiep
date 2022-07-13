import { Store } from "src/modules/store/entities/store.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Schedule {
    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number;

    @ManyToOne(type => Store, store => store.id)
    store_id: Store;

    @Column()
    type: string;

    @Column({})
    date: string;

    @Column()
    time: number;

    @Column('json')
    shift: object[];

    @Column({ default: 1})
    status: number;

    @CreateDateColumn({})
    createAt: Date;

    @UpdateDateColumn({})
    updateAt: Date;
}