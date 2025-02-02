import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['./src/**/index.ts'],
  target: 'node20',
  format: ['cjs'],
  external: [
    '@nestjs/common',
    '@nestjs/mapped-types',
    'class-validator',
    'class-transformer',
  ],
  dts: {
    entry: {
      'dtos/index': './src/dtos/index.ts',
      'types/index': './src/types/index.ts',
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
