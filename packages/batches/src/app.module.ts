import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BatchModule } from '@use-cases/batch';
import { HealthModule } from '@use-cases/health';
import { config, configSchema } from '@configs';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [config],
      validationSchema: configSchema,
    }),
    BatchModule,
    HealthModule,
  ],
})
export class AppModule {}
