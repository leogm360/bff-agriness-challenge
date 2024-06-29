import { IsString, IsNotEmpty, IsUUID, IsDate } from 'class-validator';
import { Batch } from '@agriness/data/prisma';

export class BatchDto implements Batch {
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
  @IsDate()
  createdAt: Date;

  @IsNotEmpty()
  @IsDate()
  updatedAt: Date;
}
