import { Module } from '@nestjs/common';
import { PrismaModule } from '@agriness/data/prisma';

@Module({
  imports: [PrismaModule],
})
export class AppModule {}
