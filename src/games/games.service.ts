import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Game } from './game.entity';
import { GameDetail, GameDetailDocument } from './game.schema';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game)
    private gamesRepository: Repository<Game>,

    @InjectModel(GameDetail.name)
    private gameDetailModel: Model<GameDetailDocument>,
  ) {}

  async findAll() {
    const games = await this.gamesRepository.find();

    const result = await Promise.all(
      games.map(async (game) => {
        const detail = await this.gameDetailModel.findOne({ gameId: game.id });
        return {
          ...game,
          tags: detail?.tags || [],
          rating: detail?.rating || 0,
        };
      }),
    );

    return result;
  }

  async create(data: { title: string; description: string; price: number; tags: string[] }) {
    const game = this.gamesRepository.create({
      title: data.title,
      description: data.description,
      price: data.price,
    });
    const saved = await this.gamesRepository.save(game);

    await this.gameDetailModel.create({
      gameId: saved.id,
      tags: data.tags || [],
      rating: 0,
    });

    return saved;
  }

  async remove(id: number) {
    await this.gameDetailModel.deleteOne({ gameId: id });
    await this.gamesRepository.delete(id);
    return { deleted: true };
  }
}