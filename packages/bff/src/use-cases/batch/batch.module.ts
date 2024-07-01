import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import type { RedisClientOptions } from 'redis';
import { Config, CacheConfig } from '@agriness/domain/types';
import { BatchHttpModule } from '@infra/batch';
import { AnimalHttpModule } from '@infra/animal';
import { BatchController } from './batch.controller';
import { BacthService } from './batch.service';

@Module({
  imports: [
    CacheModule.registerAsync<RedisClientOptions>({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<Config>) => ({
        ttl: configService.get<CacheConfig>('cache').cacheTTL,
        max: configService.get<CacheConfig>('cache').cacheMaxItems,
        store: redisStore,
        url: configService.get<CacheConfig>('cache').cacheRedisUrl,
      }),
    }),
    AnimalHttpModule,
    BatchHttpModule,
  ],
  controllers: [BatchController],
  providers: [BacthService],
})
export class BatchModule {}
