import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';

export default [
  {
    input: 'src/components.ts',
    output: {
      file: 'dist/components.js',
      format: 'iife',
      name: 'Clapton'
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
