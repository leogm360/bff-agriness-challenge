import { env } from 'node:process';
import type { Config, NodeEnv } from '@agriness/domain/types';

export const config = (): Config => ({
  server: {
    nodeEnv: env.NODE_ENV as NodeEnv,
    port: parseInt(env.PORT),
  },
  apis: {
    batchApiURL: env.BATCH_API_URL,
    animalApiURL: env.ANIMAL_API_URL,
  },
  cache: {
    cacheTTL: parseInt(env.CACHE_TTL),
    cacheMaxItems: parseInt(env.CACHE_MAX_ITEMS),
    cacheRedisUrl: env.CACHE_REDIS_URL,
  },
});
