import {
  Controller,
  Body,
  Get,
  Post,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { CreateAnimalDto, UpdateAnimalDto } from '@agriness/domain/dtos';
import { AnimalService } from './animal.service';

@Controller('animal')
export class AnimalController {
  constructor(private readonly animalService: AnimalService) {}

  @Get()
  public async getAnimals() {
    return this.animalService.getAnimals();
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
