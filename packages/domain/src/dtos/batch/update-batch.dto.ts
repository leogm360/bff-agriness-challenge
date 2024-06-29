import { PickType, PartialType } from '@nestjs/mapped-types';
import { BatchDto } from './batch.dto';

export class UpdateBatchDto extends PartialType(
  PickType(BatchDto, ['code', 'name'] as const),
) {}
