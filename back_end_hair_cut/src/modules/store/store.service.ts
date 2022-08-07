import { BadRequestException, ForbiddenException, HttpException, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Service } from "../service/entities/service.entity";
import { Store } from "./entities/store.entity";

@Injectable()
export class StoreService {
    constructor(
        @InjectRepository(Store)
        private storesRepository: Repository<Store>,
        @InjectRepository(Service)
        private servicesRepository: Repository<Service>,
    ) {}

    findAll() {
        return this.storesRepository.find({
            where: {
                status: 1
            }
        });
    }

    getStoreByUserId(userId) {
        return this.storesRepository.find({
            where: {
                host_id: {id: userId},
                status: 1
            }
        });
    }

    async getStoreTab(userId) {
        return await this.storesRepository.find({
            where: {
                host_id: {id: userId},
                status: 1
            },
            select: ['id', 'name']
        });
    }

    findStoreById(storeId) {
        return this.storesRepository.findOne({
            where: {
                id: storeId,
                status: 1
            }
        });
    }

    async create(userId, id, name, slug, address, description, content, imageUrl) {
        var store;

        const existSlug = await this.storesRepository.findOne({
            where: {
                slug
            }
        });

        if (id) {
            if (existSlug && id !== existSlug.id) {
                throw new BadRequestException('Slug is exist already');
            } else {
                store = await this.storesRepository.findOneBy({id: id});
                store.name = name;
                store.slug = slug;
                store.address = address;
                store.content = content;
                store.image_url = imageUrl;
                store.description = description;
            }
        } else {
            if (existSlug) {
                throw new BadRequestException('Slug is exist already'); 
            } else {
                store = this.storesRepository.create({
                    host_id: {id: userId},
                    name,
                    slug,
                    address,
                    content,
                    description,
                    image_url: imageUrl
                });
            }
        }

        return await this.storesRepository.save(store);
    }

    async delete(id) {
        const store = await this.storesRepository.findOne({
            where: {
                id
            }
        });

        if (store) {
            store.status = 0;
            return await this.storesRepository.save(store);
        } else {
            throw new HttpException('Not found Store', 404);
        }
    }

    async createService(id, name, price, description) {
        var service;

        if (id) {
            service = await this.servicesRepository.findOneBy({id: id});
            service.name = name;
            service.price = price;
            service.description = description;
        } else {
            service = this.servicesRepository.create({
                name: name,
                price: price,
                description: description
            });
        }

        return await this.servicesRepository.save(service);
    }

    async getDetailStore(slug) {
        return await this.storesRepository.findOne({
            where: {
                slug: slug
            }
        });
    }

    async getListServiceOfStore(id) {
        const store = await this.findStoreById(id);

        if (store) {
            return this.servicesRepository.find({
                where:{
                    store_id: {id}
                }
            });
        } else {
            return [];
        }

    }
}