import { Body, Controller, Get, Param, Post, Query, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(
    private readonly uploadService: UploadService
  ) {}

  @Post('')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const fileExt = file.originalname.split('.')[file.originalname.split('.').length - 1];
          const newFileName = req.query.image + '.' + req.query.key + '.' + fileExt;
          cb(null, newFileName);
        }
      })
    }
  ))
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ) {
    return process.env.BACKEND_API_URL + '/upload/' + file.path;
  }

  @Get('uploads/:filename')
  async getImage(
    @Param('filename') filename,
    @Res() res: Response
  ) {
    res.sendFile(filename, {root: './uploads'});
  }
}
