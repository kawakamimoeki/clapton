import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';

export default [
  {
    input: 'src/components.ts',
    output: {
      file: 'dist/components.js',
      format: 'esm'
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        sourceMap: false
      })
    ]
  },
  {
    input: 'src/components-for-test.ts',
    output: {
      file: 'dist/components-for-test.js',
      format: "iife",
      name: "Clapton"
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        sourceMap: false
      })
    ]
  },
  {
    input: 'src/c.ts',
    output: {
      file: 'dist/c.js',
      format: 'esm'
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        sourceMap: false
      })
    ]
  },
  {
    input: 'src/c-for-test.ts',
    output: {
      file: 'dist/c-for-test.js',
      format: 'iife',
      name: 'c'
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        sourceMap: false
      })
    ]
  },
  {
    input: 'src/client.ts',
    output: {
      file: 'dist/client.js',
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        sourceMap: false
      })
    ]
  }
];
