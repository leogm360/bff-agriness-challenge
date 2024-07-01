import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { Config, ApisConfig } from '@agriness/domain/types';
import { BatchHttpService } from './batch-http.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<Config>) => ({
        baseURL: configService.get<ApisConfig>('apis').batchApiURL,
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
  ],
  providers: [BatchHttpService],
  exports: [BatchHttpService],
})
export class BatchHttpModule {}
