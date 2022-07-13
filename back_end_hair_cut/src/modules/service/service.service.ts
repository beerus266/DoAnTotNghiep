import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Service } from "../service/entities/service.entity";

@Injectable()
export class ServicesService {
    constructor(
        @InjectRepository(Service)
        private servicesRepository: Repository<Service>,
    ) {}

    async createService(storeId, id, name, price, description, isMainService, imageUrl) {
        var service;

        if (id) {
            service = await this.servicesRepository.findOneBy({id: id});
            service.name = name;
            service.price = price;
            service.description = description;
            service.isMainService = isMainService;
            service.image_url = imageUrl;
        } else {
            service = this.servicesRepository.create({
                store_id: storeId,
                name: name,
                price: price,
                description: description,
                isMainService,
                image_url: imageUrl
            });
        }

        return await this.servicesRepository.save(service);
    }

    async find(storeId) {
        return await this.servicesRepository.find({
            where: {
                store_id: {id: storeId},
                status: 1
            }
        });
    }

    async delete(id) {
        const service = await this.servicesRepository.findOne({
            where: {
                id
            }
        });

        if (service) {
            service.status = 0;
            return await this.servicesRepository.save(service);
        } else {
            throw new HttpException('Not found Store', 401);
        }
    }

}