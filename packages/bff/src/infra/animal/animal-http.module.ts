import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { ApisConfig, Config } from '@agriness/domain/types';
import { AnimalHttpService } from './animal-http.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<Config>) => ({
        baseURL: configService.get<ApisConfig>('apis').animalApiURL,
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
  ],
  providers: [AnimalHttpService],
  exports: [AnimalHttpService],
})
export class AnimalHttpModule {}
