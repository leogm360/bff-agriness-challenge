import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AnimalModule } from '@use-case/animal';
import { HealthModule } from '@use-case/health';
import { config, configSchema } from '@configs';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [config],
      validationSchema: configSchema,
    }),
    AnimalModule,
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
