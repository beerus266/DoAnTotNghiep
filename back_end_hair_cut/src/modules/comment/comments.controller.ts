import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CommentsService } from "./comments.service";

@Controller('comment')
export class CommentsController {
    constructor(
        private readonly commentsService: CommentsService
    ) {}

    @Post('getCommentByStoreId')
    getCommentByStoreId(
        @Body('storeId') storeId: any
    ) {
        return this.commentsService.getCommentByStoreId(storeId);
    }

    @Post('create')
    create(
        @Body('storeId') storeId: string,
        @Body('comment') comment: string,
        @Body('phoneNumber') phoneNumber: string,
    ) {
        return this.commentsService.create(storeId, comment, phoneNumber);
    }
}