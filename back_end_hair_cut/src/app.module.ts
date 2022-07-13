import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/user.module';
import { StoresModule } from './modules/store/store.module';
import { CustomersModule } from './modules/customers/customers.module';
import { SchedulesModule } from './modules/schedule/schedule.module';
import { OrdersModule } from './modules/order/order.module';
import { CommentsModule } from './modules/comment/comments.module';
import { MailModule } from './modules/mail/mail.module';
import { AuthController } from './modules/auth/auth.controller';
import { AuthModule } from './modules/auth/auth.module';
import { ServicesModule } from './modules/service/service.module';
import { AuthService } from './modules/auth/auth.service';
import { UploadModule } from './modules/upload/upload.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.dev.env', '.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      // host: '172.24.2.1',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_HOST),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: ['dist/**/*.entity.{ts,js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    AuthModule,
    UsersModule,
    StoresModule,
    CustomersModule,
    SchedulesModule,
    OrdersModule,
    ServicesModule,
    CommentsModule,
    MailModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
