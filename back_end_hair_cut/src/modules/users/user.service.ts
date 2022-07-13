import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from "@nestjs-modules/mailer";
import { MailService } from "../mail/mail.service";


@Injectable()
export class UserService {
    constructor (
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private readonly jwtService: JwtService,
        private readonly mailerService: MailService
    ) {}

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    async login(username, password) {
        const user = await this.usersRepository.findOne({
            where: {
                username: username,
            }
        });
        
        if (!user) {
            throw new HttpException('Username or password is incorrect!', 401);
        } else {

            if (user.actived) {
                if (bcrypt.compareSync(password, user.password)) {
                    const token = await this.jwtService.signAsync(
                        {
                          id: user.id,
                          role: user.role
                        },
                        { expiresIn: '1d'},
                    );
    
                    return {
                        token, 
                        id: user.id,
                        role: user.role
                    };
                } else {
                    throw new HttpException('Username or password is incorrect!', 401);
                }
            } else {
                throw new HttpException('This account isn\'t actived yet!', 401);
            }
        }
    }

    async register(username, password, email) {
        const user = await this.usersRepository.findOne({
            where: {
                username
            }
        });

        if (user) {
            throw new HttpException('Username is exist already', 401);
        } else {

            const newUser = this.usersRepository.create({
                username,
                password: bcrypt.hashSync(password, 4),
                emailAddress: email
            });
            await this.usersRepository.save(newUser);

            const token = await this.jwtService.signAsync(
                {
                  id: newUser.id,
                },
                { expiresIn: '5m' },
            );

            await this.mailerService.sendUserConfirmation(email, token);
            return newUser;
        }
    }

    // async hashPassword() {
    //     const users = await this.usersRepository.find();
    //     users.forEach((user) => {
    //         console.log(bcrypt.hashSync(user.password, 4));
    //         user.password = bcrypt.hashSync(user.password, 4);
    //         this.usersRepository.save(user);
    //     })
    //     return users;
    // }

    async remove(id: string): Promise<void> {
        await this.usersRepository.delete(id);
    }
}