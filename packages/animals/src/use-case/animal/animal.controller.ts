import {
  Controller,
  Body,
  Get,
  Post,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import {
  FilterParams,
  SortParams,
  PaginationParams,
} from '@agriness/core/decorators';
import { CreateAnimalDto, UpdateAnimalDto } from '@agriness/domain/dtos';
import {
  FilteredFields,
  SortedFields,
  PaginatedFields,
} from '@agriness/domain/types';
import { AnimalService } from './animal.service';

@Controller('animal')
export class AnimalController {
  constructor(private readonly animalService: AnimalService) {}

  @Get()
  public async getAnimals(
    @FilterParams(['name', 'code']) filter: FilteredFields,
    @SortParams(['name', 'code']) sort: SortedFields,
    @PaginationParams() pagination: PaginatedFields,
  ) {
    return this.animalService.getAnimals(filter, sort, pagination);
  }

  @Get(':id')
  public async getAnimalById(@Param('id') id: string) {
    return this.animalService.getAnimalById(id);
  }

  @Post()
  public async createAnimal(@Body() data: CreateAnimalDto) {
    return this.animalService.createAnimal(data);
  }

  @Patch(':id')
  public async updateAnimal(
    @Param('id') id: string,
    @Body() data: UpdateAnimalDto,
  ) {
    return this.animalService.updateAnimal(id, data);
  }

  @Delete(':id')
  public async deleteAnimal(@Param('id') id: string) {
    return this.animalService.deleteAnimal(id);
  }
}
