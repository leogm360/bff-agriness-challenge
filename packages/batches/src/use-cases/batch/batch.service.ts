import { Injectable } from '@nestjs/common';
import { PrismaClient, Batch } from '@agriness/data/prisma';
import { CreateBatchDto, UpdateBatchDto } from '@agriness/domain/dtos';
import {
  FilteredFields,
  SortedFields,
  PaginatedFields,
} from '@agriness/domain/types';

@Injectable()
export class BatchService {
  private readonly prisma: PrismaClient = new PrismaClient();

  public async getBatches(
    filter: FilteredFields,
    sort: SortedFields,
    pagination: PaginatedFields,
  ): Promise<Batch[]> {
    return this.prisma.batch.findMany({
      where: filter,
      orderBy: sort,
      skip: pagination.offset,
      take: pagination.limit,
    });
  }

  public async getBatchById(id: string): Promise<Batch> {
    return this.prisma.batch.findUnique({ where: { id } });
  }

  public async createBatch(data: CreateBatchDto): Promise<Batch> {
    return this.prisma.batch.create({ data });
  }

  public async updateBatch(id: string, data: UpdateBatchDto): Promise<Batch> {
    return this.prisma.batch.update({ where: { id }, data });
  }

  public async deleteBatch(id: string): Promise<Batch> {
    return this.prisma.batch.delete({ where: { id } });
  }
}
