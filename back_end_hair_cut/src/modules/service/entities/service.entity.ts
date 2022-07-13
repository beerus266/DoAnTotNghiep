import { ServiceOrder } from "src/modules/order/entities/service-order.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Store } from "../../store/entities/store.entity";

@Entity()
export class Service {
    @PrimaryGeneratedColumn({
        type: 'bigint'
    })
    id: number;

    @Column({})
    name: string;

    @Column({})
    description: string;

    @Column({})
    price: string;

    @Column('boolean', {default: true})
    isMainService: boolean;

    @ManyToOne(type => Store, store => store.id)
    store_id: Store

    @OneToMany(
        type => ServiceOrder, 
        serviceOrder => serviceOrder.service,
    )
    serviceOrder: ServiceOrder[];

    @Column({ default: '/placeholder.jpg'})
    image_url: string;

    @Column({ default: 1})
    status: number;

    @CreateDateColumn({})
    createAt: Date;

    @UpdateDateColumn({})
    updateAt: Date;
}