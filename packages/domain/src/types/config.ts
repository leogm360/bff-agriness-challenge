export type NodeEnv = 'dev' | 'prod' | 'test';

export interface Environment {
  NODE_ENV: 'dev' | 'prod' | 'test';
  PORT: string;
  BATCH_API_URL: string;
  ANIMAL_API_URL: string;
  DATABASE_URL: string;
  CACHE_TTL: string;
  CACHE_MAX_ITEMS: string;
  CACHE_REDIS_URL: string;
}

export type ServerConfig = {
  nodeEnv: NodeEnv;
  port: number;
};

export type ApisConfig = {
  batchApiURL: string;
  animalApiURL: string;
};

export type CacheConfig = {
  cacheTTL: number;
  cacheMaxItems: number;
  cacheRedisUrl: string;
};

export interface Config {
  server: ServerConfig;
  apis: ApisConfig;
  cache: CacheConfig;
}
