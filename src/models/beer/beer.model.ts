import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';

export type BeerDocument = Beer & Document;
@Schema()
export class Beer {
  @Prop({ unique: true })
  uid: string;
  @Prop({ required: true })
  brand: string;
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  style: string;
  @Prop({ default: '' })
  hop: string;
  @Prop({ required: true })
  yeast: string;
  @Prop()
  malts: string;
  @Prop({ required: true })
  ibu: string;
  @Prop({ required: true })
  alcohol: string;
  @Prop({ required: true })
  blg: string;
  @Prop({ default: 0 })
  count: number;
  @Prop({ default: false, required: false })
  delete_flag: boolean;
  @Prop()
  create_dt: Date;
  @Prop()
  update_dt: Date;
}

export const BeerSchema = SchemaFactory.createForClass(Beer);
