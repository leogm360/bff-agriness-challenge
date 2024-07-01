import {
  Controller,
  UseInterceptors,
  Inject,
  Param,
  Query,
  Body,
  Get,
  Post,
  Patch,
  Delete,
} from '@nestjs/common';
import { CacheInterceptor, CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Animal } from '@agriness/data/prisma';
import { CreateAnimalDto, UpdateAnimalDto } from '@agriness/domain/dtos';
import { AnimalService } from './animal.service';
import { Queries } from '@types';

@Controller('animal')
@UseInterceptors(CacheInterceptor)
export class AnimalController {
  @Inject(CACHE_MANAGER) private cache: Cache;

  constructor(private readonly animalService: AnimalService) {}

  @Get()
  async getBatches(@Query() queries: Queries): Promise<Animal[]> {
    return this.animalService.getAnimals(queries);
  }

  @Get(':id')
  async getBatchById(@Param('id') id: string): Promise<Animal> {
    return this.animalService.getAnimalById(id);
  }

  @Post()
  async createBatch(@Body() data: CreateAnimalDto): Promise<Animal> {
    return this.animalService.createAnimal(data);
  }

  @Patch(':id')
  async updateBatch(
    @Param('id') id: string,
    @Body() data: UpdateAnimalDto,
  ): Promise<Animal> {
    this.cache.del('animal');
    return this.animalService.updateAnimal(id, data);
  }

  @Delete(':id')
  async deleteBatch(@Param('id') id: string): Promise<Animal> {
    this.cache.del('animal');
    return this.animalService.deleteAnimal(id);
  }
}
