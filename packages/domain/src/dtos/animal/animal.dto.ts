import { IsString, IsNotEmpty, IsUUID, IsDate } from 'class-validator';
import { Animal } from '@agriness/data/prisma';

export class AnimalDto implements Animal {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsUUID()
  batchId: string;

  @IsNotEmpty()
  @IsDate()
  createdAt: Date;

  @IsNotEmpty()
  @IsDate()
  updatedAt: Date;
}
