import Joi from 'joi';
import { DEFAULT_NODE_ENV, DEFAULT_PORT } from './constants';
import type { Environment } from '@agriness/domain/types';

export const configSchema = Joi.object<Pick<Environment, 'NODE_ENV' | 'PORT'>>({
  NODE_ENV: Joi.string()
    .valid('dev', 'prod', 'test')
    .default(DEFAULT_NODE_ENV)
    .required(),
  PORT: Joi.number().default(DEFAULT_PORT).required(),
});
