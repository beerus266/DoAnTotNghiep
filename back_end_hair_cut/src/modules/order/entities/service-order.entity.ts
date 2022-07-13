import { Service } from "src/modules/service/entities/service.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";

@Entity({name: 'service_order'})
export class ServiceOrder {
    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number;

    @ManyToOne(() => Order, order => order.serviceOrder)
    order: Order;

    @ManyToOne(() => Service, service => service.serviceOrder, {eager: true})
    service: Service;
}