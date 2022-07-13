import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "../order/entities/order.entity";
import { ServiceOrder } from "../order/entities/service-order.entity";
import { OrderService } from "../order/order.service";
import { Schedule } from "../schedule/entities/schedule.entity";
import { ScheduleService } from "../schedule/schedule.service";
import { Service } from "../service/entities/service.entity";
import { Store } from "./entities/store.entity";
import { StoreController } from "./store.controller";
import { StoreService } from "./store.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Store, Service, Schedule, Order, ServiceOrder]),
        JwtModule.register({
            secret:'hard!to-guess_secret',
            signOptions: { expiresIn: '1d' },
        }),
    ],
    controllers: [StoreController],
    providers: [StoreService, ScheduleService, OrderService],
})

export class StoresModule {}