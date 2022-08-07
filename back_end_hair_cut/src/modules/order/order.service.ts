import { ForbiddenException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { identity } from "rxjs";
import { Equal, In, Like, Repository } from "typeorm";
import { Service } from "../service/entities/service.entity";
import { Order } from "./entities/order.entity";
import { ServiceOrder } from "./entities/service-order.entity";

@Injectable()
export class OrderService {
    constructor (
        @InjectRepository(Order)
        private ordersRepository: Repository<Order>,
        @InjectRepository(ServiceOrder)
        private serviceOrderRepository: Repository<ServiceOrder>,
        @InjectRepository(Service)
        private serviceRepository: Repository<Service>,
    ) {}

    // async findAll(storeId) {
    //     return await this.ordersRepository.find({
    //         where: {
    //             store_id: {id: storeId}
    //         },
    //         relations: ['Service'],
    //         order: {date: 'ASC'}
    //     });
    // }

    async create (phoneNumber, storeId, servicesId, pickedDate, pickedTime) {
        const order = this.ordersRepository.create({
            phoneNumber,
            store_id: {id: storeId},
            date: pickedDate,
            time: pickedTime,
        });
        await this.ordersRepository.save(order);

        servicesId.forEach( async (serviceId) => {
            const serviceOrder = this.serviceOrderRepository.create({
                order: {id: order.id},
                service: {id: serviceId}
            });

            await this.serviceOrderRepository.save(serviceOrder);
        });

        return order;
    }

    async find(storeId) {
        const orders = await this.ordersRepository.find({
            where: {
                store_id: {id: storeId}
            },
            relations: ['serviceOrder'],
            order: {date: 'DESC'}
        });

        return orders;
    }

    async getOrderByStoreInWeek(storeId, week) {
        return await this.ordersRepository.findBy({
            store_id: Equal(storeId),
            date: In(week)
        });
    }

    async updateStatus(orderId, status) {
        const order = await this.ordersRepository.findOne({
            where: {
                id: orderId
            }
        });

        if (order) {
            order.status = status;
            return await this.ordersRepository.save(order);
        } else {
            throw new ForbiddenException('Order not found');
        }
    } 

    async search (searchKey, store_id) {
        const orders = await this.ordersRepository.find({
            where: [
                { store_id: {id: store_id}, phoneNumber: Like(`%${searchKey}%`) },
                { store_id: {id: store_id}, date: Like(`%${searchKey}%`) },
                { store_id: {id: store_id}, time: Like(`%${searchKey}%`) },
                { store_id: {id: store_id}, status: Like(`%${searchKey}%`) },
            ],
            relations: ['serviceOrder'],
            order: {
                date: 'DESC'
            }
        });

        return orders;
    }

    async findAll(storeIds) {
        return await this.ordersRepository.find({
            where: {
                store_id: {id: In(storeIds)}
            },
            relations: ['serviceOrder'],
        });
    }

}