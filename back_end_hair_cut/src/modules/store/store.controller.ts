import { Body, Controller, ForbiddenException, Get, Param, Post, Query, Req, UseGuards } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { OrderService } from "../order/order.service";
import { ScheduleService } from "../schedule/schedule.service";
import { StoreService } from "./store.service";

@Controller('store')
export class StoreController {
    constructor(
        private readonly storeService: StoreService,
        private readonly scheduleService: ScheduleService,
        private readonly ordersService: OrderService,
        private readonly jwtService: JwtService
    ) {}

    @Get('findAll')
    async findAll() {
        return this.storeService.findAll();
    }

    @Get('getStoreByUserId')
    async getStoreByUserId(
        @Body('userId') userId: any,
        @Req() rq,
    ) {
        try {
            const userToken = await this.jwtService.verify(rq.headers.authorization.slice(7));
            return this.storeService.getStoreByUserId(userToken.id);

        } catch(error) {
            throw new ForbiddenException();
        }
    }

    @Get('getStoreTab')
    async getStoreTab(
        @Body('userId') userId: any,
    ) {
        return this.storeService.getStoreTab(userId);
    }

    @Post('create')
    create(
        @Body('userId') userId: string,
        @Body('id') id: string,
        @Body('name') name: string,
        @Body('slug') slug: string,
        @Body('address') address: string,
        @Body('description') description: string,
        @Body('image') imageUrl: string,
        @Body('content') content: string,
    ) {
        return this.storeService.create(userId, id, name, slug, address, description, content, imageUrl);
    }

    @Post('delete')
    delete (
        @Body('storeId') storeId: string
    ) {
        return this.storeService.delete(storeId);
    }

    @Post('service/create')
    createService(
        @Body('id') id: string,
        @Body('name') name: string,
        @Body('price') price: string,
        @Body('description') description: string,
    ) {
        return this.storeService.createService(id, name, price, description);
    }

    @Get('getStorePage/:slug')
    getDetailStore(
        // @Param('slug') slug: string,
        @Req() req: Request
        // @Query('slug') slug3: string
    ) {
        // console.log(slug3);

        const url = req?.url.split('/');
        const slug = url[url.length - 1];

        return this.storeService.getDetailStore(slug);
    }

    @Get('/:id/getSchedule')
    async getScheduleByStore(@Param('id') id) {
        const scheduleOfWeek = await this.scheduleService.getScheduleByStore(id);
        const orders = await this.ordersService.getOrderByStoreInWeek(id, scheduleOfWeek.map(s => s.date));
        const schedules = scheduleOfWeek.map((s) => {
            s.order = [];
            for (let order of orders) {
                if (s.date === order.date) {
                    s.order.push(order.time);
                }
            }

            return s;
        });
        return schedules;
    }

    // @Get('/:id/getService')
    // async getServiceByStore(@Param('id') id) {
    //     return this.storeService.getListServiceOfStore(id);
    // }

    @Get('/:id/getListService')
    async getListServiceOfStore(
        @Param('id') id: any,
    ) {
        return this.storeService.getListServiceOfStore(id);
    }
    
}