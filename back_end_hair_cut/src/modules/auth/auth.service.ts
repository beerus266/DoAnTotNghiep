import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
    constructor (
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) {}

    async activeEmail(token) {
        const payload = await this.jwtService.verify(token);

        const user = await this.usersRepository.findOne({
            where: {
                id: payload.id
            }
        });

        if (user) {
            user.actived = true;
            await this.usersRepository.save(user);
        } else {
            throw new NotFoundException();
        }
    }
}
