import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        logger: true,
        host: 'smtp.gmail.com',
        secure: false,
        port: 587,
        auth: {
          user: 'haircuthainv@gmail.com',
          pass: 'ctnxsyojdhdntdjo',
        },
      },
      defaults: {
        from: '"Confirm account HairCut" <noreply@example.com>'
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true
        }
      }
    }),
  ],
  providers: [MailService]
})
export class MailModule {}
