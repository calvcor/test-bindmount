import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('bindmount')
  getBindMountFiles(): string[] {
    return this.appService.getBindMountFiles();
  }

  @Get('bindmount/:filename')
  getBindMountFileContent(@Param('filename') filename: string): string {
    return this.appService.getBindMountFileContent(filename);
  }

  @Get('single-file')
  getSingleFile(): string {
    return this.appService.getSingleFile();
  }
}
