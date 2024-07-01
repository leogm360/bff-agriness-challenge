import { env } from 'node:process';
import type { Config, NodeEnv } from '@agriness/domain/types';

export const config = (): Pick<Config, 'server'> => ({
  server: {
    nodeEnv: env.NODE_ENV as NodeEnv,
    port: parseInt(env.PORT),
  },
});
