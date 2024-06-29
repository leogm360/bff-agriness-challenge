import { defineConfig } from 'tsup';
import { glob } from 'glob';

export default defineConfig(async () => {
  const entriesDict: Record<string, string> = {};

  const entries = await glob('./src/**/index.ts');

  entries.forEach((entry) => {
    entriesDict[`${entry.split('/')[1]}/index`] = entry;
  });

  return {
    entry: ['./src/**/index.ts'],
    target: 'node20',
    format: ['cjs'],
    external: ['@nestjs/common'],
    dts: {
      entry: entriesDict,
    },
    sourcemap: true,
    clean: true,
    skipNodeModulesBundle: true,
    bundle: false,
    treeshake: true,
    tsconfig: 'tsconfig.json',
    esbuildOptions: (opt) => {
      opt.outbase = './src';
    },
  };
});
