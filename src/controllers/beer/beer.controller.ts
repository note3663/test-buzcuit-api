import {
  Body,
  Controller,
  Get,
  Param,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { BeerService } from '../../services/beer/beer.service';

@Controller('beer')
export class BeerController {
  constructor(private readonly beerService: BeerService) {}

  @Post()
  async create(@Body() body) {
    return await this.beerService.create(body);
  }

  @Get('/random_beer')
  async randomBeer(@Query('old_data') old_data, @Query('limit') limit) {
    return await this.beerService.randomBeer(old_data, limit);
  }
}
