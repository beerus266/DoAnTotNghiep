import { Body, Controller, ForbiddenException, Get, Param, Post, Query, Req, UseGuards } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
// import { AdminAuthGuard } from "../auth/jwt.strategy";
import { OrderService } from "./order.service";

@Controller('order')
// @UseGuards(AdminAuthGuard)
export class OrderController {
    constructor (
        private readonly orderService: OrderService,
        private readonly jwtService: JwtService
    ) {}

    @Post('create')
    create(
        @Body('phoneNumber') phoneNumber: string,
        @Body('storeId') storeId: string,
        @Body('servicesId') servicesId,
        @Body('pickedDate') pickedDate: string,
        @Body('pickedTime') pickedTime: string,
    ) {
        const _phoneNumber = phoneNumber.split('.').join('');
        return this.orderService.create(_phoneNumber, storeId, servicesId, pickedDate, pickedTime);
    }

    @Post('getByStoreId')
    async getByStoreId (
        @Body('storeId') storeId: any
    ) {
        try {
            return this.orderService.find(storeId);

        } catch(error) {
            throw new ForbiddenException();
        }
    }

    @Post('updateStatus')
    async updateStatus (
        @Body('orderId') orderId: any,
        @Body('status') status: any
    ) {
        try {
            return this.orderService.updateStatus(orderId, status);

        } catch(error) {
            throw new ForbiddenException();
        }
    }

    @Post('search')
    async search (
        @Body('searchKey') searchKey: any,
        @Body('storeId') storeId: any,
    ) {
        try {
            return this.orderService.search(searchKey, storeId);

        } catch(error) {
            throw new ForbiddenException();
        }
    }

    @Get('getByStoreId/:storeId')
    async findAll (
        @Param('storeId') store_id,
        @Req() rq: any
    ) {
        try {
            const userToken = await this.jwtService.verify(rq.headers.authorization.slice(7));
            return this.orderService.find(store_id);

        } catch(error) {
            throw new ForbiddenException();
        }
    }

    @Get('getAllOrder')
    async getAllOrder(
        @Body('storeIds') storeIds: any,
    ) {
        return this.orderService.findAll(storeIds);
    }

}