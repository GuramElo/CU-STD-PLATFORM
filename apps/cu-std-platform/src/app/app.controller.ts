import { Controller, Post, UploadedFile } from '@nestjs/common';
@Controller()
export class AppController {
  @Post('upload')
  // @UseInterceptors(
  //   FileInterceptor('file', {
  //     dest: 'hello',
  //     limits: {
  //       fileSize: 10 * 1024 * 1024, //mb
  //     },
  //   })
  // )
  public async uploadFile(@UploadedFile() file: any) {
    console.log(file);
    return file;
  }
}
