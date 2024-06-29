import { PickType } from '@nestjs/mapped-types';
import { BatchDto } from './batch.dto';

export class CreateBatchDto extends PickType(BatchDto, [
  'code',
  'name',
] as const) {}
