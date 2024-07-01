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
import { Batch } from '@agriness/data/prisma';
import { CreateBatchDto, UpdateBatchDto } from '@agriness/domain/dtos';
import { BacthService } from './batch.service';
import { Queries } from '@types';

@Controller('batch')
@UseInterceptors(CacheInterceptor)
export class BatchController {
  @Inject(CACHE_MANAGER) private cache: Cache;

  constructor(private readonly batchService: BacthService) {}

  @Get()
  async getBatches(@Query() queries: Queries): Promise<Batch[]> {
    return this.batchService.getBatches(queries);
  }

  @Get(':id')
  async getBatchById(@Param('id') id: string): Promise<Batch> {
    return this.batchService.getBatchById(id);
  }

  @Post()
  async createBatch(@Body() data: CreateBatchDto): Promise<Batch> {
    return this.batchService.createBatch(data);
  }

  @Patch(':id')
  async updateBatch(
    @Param('id') id: string,
    @Body() data: UpdateBatchDto,
  ): Promise<Batch> {
    this.cache.del('batch');
    return this.batchService.updateBatch(id, data);
  }

  @Delete(':id')
  async deleteBatch(@Param('id') id: string): Promise<Batch> {
    this.cache.del('batch');
    return this.batchService.deleteBatch(id);
  }
}
