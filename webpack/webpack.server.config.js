const shared = require('./shared');

module.exports = {
  target: 'node',
  entry: {
    server: './.build/src/server/index.js',
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
};
