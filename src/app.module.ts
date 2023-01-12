import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { MongooseConfig } from './config/mongoose.config';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { BeerModule } from './controllers/beer/beer.module';
import { BeerController } from './controllers/beer/beer.controller';
import { BeerService } from './services/beer/beer.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync(MongooseConfig),
    BeerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
