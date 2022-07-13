import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "../order/entities/order.entity";
import { ServiceOrder } from "../order/entities/service-order.entity";
import { OrderService } from "../order/order.service";
import { Service } from "../service/entities/service.entity";
import { Schedule } from "./entities/schedule.entity";
import { ScheduleController } from "./schedule.controller";
import { ScheduleService } from "./schedule.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Schedule, Order, ServiceOrder, Service]),
        JwtModule.register({
            secret:'hard!to-guess_secret',
            signOptions: { expiresIn: '1d' },
        }),
    ],
    controllers: [ScheduleController],
    providers: [ScheduleService, OrderService]
})
export class SchedulesModule {}