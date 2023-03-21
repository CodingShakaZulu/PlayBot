import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

export default {
  input: './src/main.tsx',
  output: {
    dir: 'dist'
  },
  plugins: [
    nodeResolve({ browser: true }),,
    replace({
      'process.env.NODE_ENV': JSON.stringify( 'development' )
    }),
    commonjs(),
    typescript(),
    serve({
      contentBase: ['dist', 'public']
    }),
    livereload({
      watch: ['dist', 'public']
    })
  ]
};