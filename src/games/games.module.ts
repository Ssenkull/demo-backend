import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { Game } from './game.entity';
import { GameDetail, GameDetailSchema } from './game.schema';

@Module({
  imports: [
    TypeOrmModule.forFeature([Game]),
    MongooseModule.forFeature([
      { name: GameDetail.name, schema: GameDetailSchema }
    ]),
  ],
  controllers: [GamesController],
  providers: [GamesService],
})
export class GamesModule {}