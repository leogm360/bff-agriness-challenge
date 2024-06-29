import { PickType } from '@nestjs/mapped-types';
import { AnimalDto } from './animal.dto';

export class CreateAnimalDto extends PickType(AnimalDto, [
  'code',
  'name',
  'batchId',
] as const) {}
