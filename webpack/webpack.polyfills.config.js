const shared = require('./shared');

module.exports = {
  entry: {
    polyfills: './.build/src/client/polyfills.js',
  },
  output: shared.output,
  module: {
    rules: [
      shared.babelLoader,
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
  plugins: [
    shared.UglifyJsPlugin,
  ],
};
