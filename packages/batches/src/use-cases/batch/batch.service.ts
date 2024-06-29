import { Injectable } from '@nestjs/common';
import { PrismaService, Batch } from '@agriness/data/prisma';
import { CreateBatchDto, UpdateBatchDto } from '@agriness/domain/dtos';

@Injectable()
export class BatchService {
  constructor(private readonly prisma: PrismaService) {}

  public async getBatches(): Promise<Batch[]> {
    return this.prisma.batch.findMany();
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
