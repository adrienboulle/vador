import rollup from 'rollup';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';

const cacheBuster = require('./gulp/modules/cachbusting');

export default {
  entry: 'src/app/main.prod.js',
  dest: '.build/public/build/build' + '.' + cacheBuster() + '.min' + '.js', // output a single application bundle
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
