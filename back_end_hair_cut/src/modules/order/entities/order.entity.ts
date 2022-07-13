import { Service } from "src/modules/service/entities/service.entity";
import { Store } from "src/modules/store/entities/store.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { ServiceOrder } from "./service-order.entity";

@Entity()
export class Order {
    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number;

    @ManyToOne(type => Store, store => store.id)
    store_id: Store;

    @OneToMany(
        () => ServiceOrder, 
        serviceOrder => serviceOrder.order, 
    )
    serviceOrder: ServiceOrder[]

    @Column({})
    phoneNumber: string;

    @Column({ default: 'Booked'})
    status: string;

    @Column({})
    date: string;

    @Column({})
    time: string;

    @CreateDateColumn({})
    createAt: Date;

    @UpdateDateColumn({})
    updateAt: Date;
}