import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from '../services/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/test1')
  async test1(@Body() body) {
    return await this.appService.test1(body);
  }
}
