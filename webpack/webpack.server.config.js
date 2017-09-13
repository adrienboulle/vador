const shared = require('./shared');

module.exports = {
  target: 'node',
  entry: {
    server: './.build/private/src/server/index.js',
  },
  output: shared.output,
  module: {
    rules: [
      shared.ngRouterLoader('sync'),
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
  externals: {
    ajs: 'commonjs ajs',
    express: 'commonjs express',
    domino: 'commonjs domino',
    'express-ejs-layouts': 'commonjs express-ejs-layouts',
    'html-minifier': 'commonjs html-minifier',
    rimraf: 'commonjs rimraf',
    typescript: 'commonjs typescript',
    'body-parser': 'commonjs body-parser',
  },
  node: {
    __filename: true,
    __dirname: true,
  },
};
