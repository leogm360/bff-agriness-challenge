import { PickType, PartialType } from '@nestjs/mapped-types';
import { AnimalDto } from './animal.dto';

export class UpdateAnimalDto extends PartialType(
  PickType(AnimalDto, ['code', 'name'] as const),
) {}
