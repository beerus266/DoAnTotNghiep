import { Body, Controller, ForbiddenException, Get, Param, Post, Req } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { OrderService } from "../order/order.service";
import { StoreService } from "../store/store.service";
import { ScheduleService } from "./schedule.service";

@Controller('schedule')
export class ScheduleController {
    constructor(
        private readonly scheduleService: ScheduleService,
        private readonly jwtService: JwtService,
    ) {}

    @Post('create')
    create (
        @Body('schedules') schedules,
        @Body('storeId') storeId
    ) {
        return this.scheduleService.create(storeId, schedules);
    }

    @Post('delete')
    delete (@Body('scheduleId') scheduleId) {
        return this.scheduleService.delete(scheduleId);
    }

    @Get('')
    async findAll (
        @Req() rq: any,
        @Body('storeId') storeId: any
    ) {
        try {
            const userToken = await this.jwtService.verify(rq.headers.authorization.slice(7));
            return this.scheduleService.find(storeId);

        } catch(error) {
            throw new ForbiddenException();
        }
    }

    @Post('getByStoreId')
    async getByStoreId (
        @Req() rq: any,
        @Body('storeId') storeId: any
    ) {
        try {
            // await this.jwtService.verify(rq.headers.authorization.slice(7));
            return this.scheduleService.find(storeId);
        } catch(error) {
            throw new ForbiddenException();
        }
    }
}