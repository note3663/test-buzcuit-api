import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { v4 as uuid } from 'uuid';

import { Beer, BeerDocument } from '../../models/beer/beer.model';
import { ObjectId } from 'mongodb';

@Injectable()
export class BeerService {
  constructor(
    @InjectModel(Beer.name) private readonly beerModel: Model<BeerDocument>,
  ) {}

  async create(body) {
    const { brand, name, style, hop, yeast, malts, ibu, alcohol, blg } = body;

    try {
      const res = new this.beerModel({
        uid: uuid(),
        brand: brand,
        name: name,
        style: style,
        hop: hop,
        yeast: yeast,
        malts: malts,
        ibu: ibu,
        alcohol: alcohol,
        blg: blg,
        delete_flag: 0,
        create_dt: new Date(),
      }).save();
      return res;
    } catch {
      throw new HttpException(
        {
          meta: {
            code: HttpStatus.CONFLICT,
            message: 'empty bank account',
          },
        },
        HttpStatus.CONFLICT,
      );
    }
  }

  async get(body) {
    const { limit, page } = body;
    const req_limit = limit || 6;
    const req_page = page || 1;
    const res = await this.beerModel
      .find({})
      .skip((req_page - 1) * req_limit)
      .limit(req_limit);
    return res;
  }

  async randomBeer(old_data, limit) {
    const req_limit = limit || 2;
    let total_data = 0;
    let data_beer;

    if (old_data) {
      total_data = await this.beerModel.count();
      //  console.log(
      //       JSON.parse(old_data)
      //         .map((x) => `'${x}'`)
      //         .join(' , '),
      //     );
      if ([old_data].length == total_data) {
        throw new HttpException(
          {
            meta: {
              code: HttpStatus.CONFLICT,
              message: 'maximum data',
            },
          },
          HttpStatus.CONFLICT,
        );
      }

      data_beer = await this.beerModel.find({ uid: { $nin: [old_data] } });
    } else {
      data_beer = await this.beerModel.find({});
    }
    const res = data_beer.sort(() => 0.5 - Math.random()).slice(0, req_limit);
   
    await this.beerModel.findOneAndUpdate(
      { _id: res[0]._id },
      { count: res[0].count + 1 },
      {
        new: true,
      },
    );
    return { data: res, total: total_data };
  }
}
