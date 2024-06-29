import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Patch,
  Delete,
} from '@nestjs/common';
import { CreateBatchDto, UpdateBatchDto } from '@agriness/domain/dtos';
import { BatchService } from './batch.service';

@Controller('batch')
export class BatchController {
  constructor(private readonly batchService: BatchService) {}

  @Get()
  public async getBatches() {
    return this.batchService.getBatches();
  }

  @Get(':id')
  public async getBatchById(@Param('id') id: string) {
    return this.batchService.getBatchById(id);
  }

  @Post()
  public async createBatch(@Body() data: CreateBatchDto) {
    return this.batchService.createBatch(data);
  }

  @Patch(':id')
  public async updateBatch(
    @Param('id') id: string,
    @Body() data: UpdateBatchDto,
  ) {
    return this.batchService.updateBatch(id, data);
  }

  @Delete(':id')
  public async deleteBatch(@Param('id') id: string) {
    return this.batchService.deleteBatch(id);
  }
}
