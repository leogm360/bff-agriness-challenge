import { Module } from '@nestjs/common';
import { PrismaModule } from '@agriness/data/prisma';
import { AnimalModule } from '@use-case/animal';
console.log(PrismaModule);
@Module({
  imports: [PrismaModule, AnimalModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
