import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BatchModule } from '@use-cases/batch';
import { config } from '@configs';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [config],
    }),
    BatchModule,
  ],
})
export class AppModule {}
