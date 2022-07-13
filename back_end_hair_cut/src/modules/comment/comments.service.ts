import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Comment } from "./entities/comment.entity";

@Injectable()
export class CommentsService {
    constructor (
        @InjectRepository(Comment)
        private commentRepository: Repository<Comment>
    ) {}

    async create (storeId, comment, phoneNumber) {
        var _comment = this.commentRepository.create({
            comment: comment,
            phoneNumber: phoneNumber,
            store_id: {id: storeId},
        });

        return await this.commentRepository.save(_comment);
    }

    async getCommentByStoreId(storeId) {
        return await this.commentRepository.find({
            where: {
                store_id: {id: storeId}
            },
            order: {
                createAt: 'DESC'
            }
        })
    }
}