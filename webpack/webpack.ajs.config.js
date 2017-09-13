const shared = require('./shared');

module.exports = {
  entry: {
    ajs: './.build/private/src/client/app/app.js',
  },
  output: shared.output,
  module: {
    rules: [
      shared.ngRouterLoader(),
      shared.ngRouterLoaderPreset('ajs'),
      shared.babelLoader,
    ],
  },
  resolveLoader: shared.resolveLoader,
  resolve: {
    extensions: ['.js'],
  },
  plugins: [
    shared.UglifyJsPlugin,
  ],
};
