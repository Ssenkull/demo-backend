import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { GamesService } from './games.service';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get()
  findAll() {
    return this.gamesService.findAll();
  }

  @Post()
  create(@Body() body: { title: string; description: string; price: number; tags: string[] }) {
    return this.gamesService.create(body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gamesService.remove(Number(id));
  }
}