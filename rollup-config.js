import rollup from 'rollup';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';

const config = require('./conf');

const cacheBuster = require('./gulp/modules/cachbusting');

const buildFileSufix = config.env.name === 'production' ? '.' + cacheBuster() + '.min' : '';

export default {
  entry: '.build/aot/app/main.js',
  dest: '.build/public/build/build' + buildFileSufix + '.js', // output a single application bundle
  sourceMap: false,
  format: 'iife',
  plugins: [
    nodeResolve({ jsnext: true, module: true }),
    commonjs({
      include: 'node_modules/rxjs/**',
    }),
    uglify(),
  ],
};
