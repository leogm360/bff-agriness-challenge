import { Module } from '@nestjs/common';
import { PrismaModule } from '@agriness/data/prisma';
import { AnimalModule } from '@use-case/animal';

@Module({
  imports: [PrismaModule, AnimalModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
