import { Body, Controller, ForbiddenException, Get, Param, Post, Query, Req, UseGuards } from "@nestjs/common";
import { ServicesService } from "./service.service";

@Controller('service')
export class ServiceController {
    constructor(
        private readonly servicesService: ServicesService,
    ) {}
    
    @Post('getByStoreId')
    async getByStoreId (
        @Body('storeId') storeId: any
    ) {
        try {
            return this.servicesService.find(storeId);

        } catch(error) {
            throw new ForbiddenException();
        }
    }

    @Post('create')
    createService(
        @Body('storeId') storeId: string,
        @Body('id') id: string,
        @Body('name') name: string,
        @Body('price') price: string,
        @Body('description') description: string,
        @Body('isMainService') isMainService: boolean,
        @Body('imageUrl') imageUrl: string,
    ) {
        return this.servicesService.createService(storeId, id, name, price, description, isMainService, imageUrl);
    }

    @Post('delete')
    delete (
        @Body('serviceId') serviceId: string
    ) {
        return this.servicesService.delete(serviceId);
    }
}