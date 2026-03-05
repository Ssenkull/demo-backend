import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GameDetailDocument = GameDetail & Document;

@Schema()
export class GameDetail {
  @Prop({ required: true })
  gameId: number; // зв'язок з Postgres id

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ default: 0 })
  rating: number;
}

export const GameDetailSchema = SchemaFactory.createForClass(GameDetail);