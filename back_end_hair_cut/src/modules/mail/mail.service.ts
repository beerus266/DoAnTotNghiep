import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) {}

    async sendUserConfirmation(email, token) {
        const url = `${process.env.BACKEND_API_URL}/auth/confirm?token=${token}`;
        await this.mailerService.sendMail({
            to: email,
            subject: 'Welcome to our Manage store. Please verify account.',
            template: 'confirmation', // `.hbs` extension is appended automatically
            context: {
                name: email,
                url,
            },
        });
    }
}
