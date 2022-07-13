import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MailModule } from "../mail/mail.module";
import { MailService } from "../mail/mail.service";
import { User } from "./entities/user.entity";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]), 
        JwtModule.register({ secret: 'hard!to-guess_secret' }),
        MailModule
    ],
    controllers: [UserController],
    providers: [UserService, MailService]
})

export class UsersModule {}