import { Body, Controller, ForbiddenException, Get, Post, Req } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "./user.service";

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    @Post('login')
    login(
        @Body('username') username: string,
        @Body('password') password: string,
    ) {
        return this.userService.login(username, password);
    }

    @Post('register')
    register(
        @Body('username') username: string,
        @Body('password') password: string,
        @Body('email') email: string,
    ) {
        return this.userService.register(username, password, email);
    }

    @Get('isLogin')
    async isLogin(
        @Req() rq: any,
    ) {
        try {
            const userToken = await this.jwtService.verify(rq.headers.authorization.slice(7));
            return true;

        } catch(error) {
            throw new ForbiddenException();
        }
    }

    @Get('getAllUser')
    async getAllUser () {
        return await this.userService.findAll()
    }

    // @Get('hashPassword')
    // hashPassword() {
    //     return this.userService.hashPassword();
    // }
}