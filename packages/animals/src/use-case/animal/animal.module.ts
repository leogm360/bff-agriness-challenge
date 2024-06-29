import { Module } from '@nestjs/common';
import { AnimalController } from './animal.controller';
import { AnimalService } from './animal.service';

@Module({
  controllers: [AnimalController],
  providers: [AnimalService],
})
export class AnimalModule {}
