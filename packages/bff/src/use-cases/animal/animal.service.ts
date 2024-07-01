import { Injectable, ConflictException } from '@nestjs/common';
import { Animal } from '@agriness/data/prisma';
import { CreateAnimalDto, UpdateAnimalDto } from '@agriness/domain/dtos';
import { AnimalHttpService } from '@infra/animal';
import { Queries } from '@types';

@Injectable()
export class AnimalService {
  constructor(private readonly animalHttpService: AnimalHttpService) {}

  async getAnimals(queries: Queries): Promise<Animal[]> {
    return this.animalHttpService.getAnimals(queries);
  }

  async getAnimalById(id: string): Promise<Animal> {
    return this.animalHttpService.getAnimalById(id);
  }

  async createAnimal(data: CreateAnimalDto): Promise<Animal> {
    const batchByName = await this.animalHttpService.getAnimalsByName(
      data.name,
    );
    const batchByCode = await this.animalHttpService.getAnimalsByCode(
      data.code,
    );

    if (batchByName.length > 0) {
      throw new ConflictException(
        `Batch with the name ${data.name} already exists`,
      );
    }

    if (batchByCode.length > 0) {
      throw new ConflictException(
        `Batch with the code ${data.code} already exists`,
      );
    }

    return this.animalHttpService.createAnimal(data);
  }

  async updateAnimal(id: string, data: UpdateAnimalDto): Promise<Animal> {
    return this.animalHttpService.updateAnimal(id, data);
  }

  async deleteAnimal(id: string): Promise<Animal> {
    return this.animalHttpService.deleteAnimal(id);
  }
}
