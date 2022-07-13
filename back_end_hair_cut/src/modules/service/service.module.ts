import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Service } from "../service/entities/service.entity";
import { ServiceController } from "./service.controller";
import { ServicesService } from "./service.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Service]),
        JwtModule.register({
            secret:'hard!to-guess_secret',
            signOptions: { expiresIn: '1d' },
        }),
    ],
    controllers: [ServiceController],
    providers: [ServicesService],
})

export class ServicesModule {}