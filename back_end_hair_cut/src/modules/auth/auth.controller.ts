import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @Get('confirm')
    async activeEmail(
        @Res() res,
        @Query() params,
    ) {
        console.log(params);
        await this.authService.activeEmail(params.token);
        return res.redirect(`${process.env.FE_URL}/backend/login?active-success`);
    }
}
