import {
    Body,
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
    Get,
    Param,
    Res,
  } from '@nestjs/common';
  import { join } from 'path';
  import { extname } from 'path';
  import { Response } from 'express';
  import { diskStorage } from 'multer';
  import { createReadStream } from 'fs';
  import { ApiTags } from '@nestjs/swagger';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { IsPublic } from './auth/decorators/is-public.decorator';
  
  @IsPublic()
  @ApiTags('file')
  @Controller()
  export class FileController {
    @Post('file')
    @UseInterceptors(
      FileInterceptor('file', {
        storage: diskStorage({
          destination: './files',
          filename: (req, file, callback) => {
            const ext = extname(file.originalname);
            const filename = `${file.originalname}${ext}`;
            callback(null, filename);
          },
        }),
      }),
    )
    uploadFile(@UploadedFile() file: Express.Multer.File) {  
      return {
        message: 'File uploaded',
        fileUrl: `http://localhost:3333/file/${file.filename}`,
      };
    }
  
    @Get('file/:filename')
    async getFile(@Param('filename') filename: string, @Res() res: Response) {
      const path = join(__dirname, '../files', filename);
      res.setHeader('Content-Type', 'image/jpeg');
      createReadStream(path).pipe(res);
    }
  }
  