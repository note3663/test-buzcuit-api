import { Module } from '@nestjs/common';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { Beer, BeerSchema } from '../../models/beer/beer.model';
import { ConfigModule } from '@nestjs/config';
import { BeerController } from '../beer/beer.controller';
import { BeerService } from '../../services/beer/beer.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeatureAsync([
      {
        name: Beer.name,
        useFactory: async (connection: Connection) => {
          const schema = BeerSchema;
          return schema;
        },
        inject: [getConnectionToken()],
      },
    ]),
    BeerModule,
  ],
  controllers: [BeerController],
  providers: [BeerService],
  exports: [BeerModule],
})
export class BeerModule {}
