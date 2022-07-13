import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Service } from "../service/entities/service.entity";
import { Order } from "./entities/order.entity";
import { ServiceOrder } from "./entities/service-order.entity";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Order, ServiceOrder, Service]),
        JwtModule.register({
            secret:'hard!to-guess_secret',
            signOptions: { expiresIn: '1d' },
        }),
    ],
    controllers: [OrderController],
    providers: [OrderService],
})

export class OrdersModule {}