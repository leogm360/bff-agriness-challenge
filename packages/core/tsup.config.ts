import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['./src/**/index.ts'],
  target: 'node20',
  format: ['cjs'],
  external: ['@nestjs/common', 'express'],
  dts: {
    entry: {
      'decorators/index': './src/decorators/index.ts',
    },
  },
  sourcemap: true,
  clean: true,
  skipNodeModulesBundle: true,
  bundle: true,
  treeshake: true,
  tsconfig: 'tsconfig.json',
  esbuildOptions: (opt) => {
    opt.outbase = './src';
  },
});
