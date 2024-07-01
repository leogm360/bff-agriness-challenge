import { Injectable, ConflictException } from '@nestjs/common';
import { Batch } from '@agriness/data/prisma';
import { CreateBatchDto, UpdateBatchDto } from '@agriness/domain/dtos';
import { BatchHttpService } from '@infra/batch';
import { AnimalHttpService } from '@infra/animal';
import { Queries } from '@types';

@Injectable()
export class BacthService {
  constructor(
    private readonly batchHttpService: BatchHttpService,
    private readonly animalHttpService: AnimalHttpService,
  ) {}

  async getBatches(queries: Queries): Promise<Batch[]> {
    return this.batchHttpService.getBatches(queries);
  }

  async getBatchById(id: string): Promise<Batch> {
    return this.batchHttpService.getBatchById(id);
  }

  async createBatch(data: CreateBatchDto): Promise<Batch> {
    const batchByName = await this.batchHttpService.getBatchByName(data.name);
    const batchByCode = await this.batchHttpService.getBatchByCode(data.code);

    if (batchByName.length > 0) {
      throw new ConflictException(
        `Batch with the code '${data.name}' already exists`,
      );
    }

    if (batchByCode.length > 0) {
      throw new ConflictException(
        `Batch with the name '${data.code}' already exists`,
      );
    }

    return this.batchHttpService.createBatch(data);
  }

  async updateBatch(id: string, data: UpdateBatchDto): Promise<Batch> {
    const batchByName = await this.batchHttpService.getBatchByName(data.name);
    const batchByCode = await this.batchHttpService.getBatchByCode(data.code);

    if (batchByName.length > 0 && batchByName[0].id !== id) {
      throw new ConflictException(
        `Batch with the code '${data.name}' already exists`,
      );
    }

    if (batchByCode.length > 0 && batchByCode[0].id !== id) {
      throw new ConflictException(
        `Batch with the name '${data.code}' already exists`,
      );
    }

    return this.batchHttpService.updateBatch(id, data);
  }

  async deleteBatch(id: string): Promise<Batch> {
    const animals = await this.animalHttpService.getAnimals();

    if (animals.length > 0) {
      throw new ConflictException('You cannot delete a batch with animals');
    }

    return this.batchHttpService.deleteBatch(id);
  }
}
