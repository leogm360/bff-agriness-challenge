import Joi from 'joi';
import {
  DEFAULT_NODE_ENV,
  DEFAULT_PORT,
  DEFAULT_CACHE_TTL,
  DEFAULT_CACHE_MAX_ITEMS,
} from './constants';
import type { Environment } from '@agriness/domain/types';

export const configSchema = Joi.object<Environment>({
  NODE_ENV: Joi.string()
    .valid('dev', 'prod', 'test')
    .default(DEFAULT_NODE_ENV)
    .required(),
  PORT: Joi.number().default(DEFAULT_PORT).required(),
  ANIMAL_API_URL: Joi.string().uri().required(),
  BATCH_API_URL: Joi.string().uri().required(),
  CACHE_TTL: Joi.number().default(DEFAULT_CACHE_TTL).required(),
  CACHE_MAX_ITEMS: Joi.number().default(DEFAULT_CACHE_MAX_ITEMS).required(),
  CACHE_REDIS_URL: Joi.string().uri().required(),
});
