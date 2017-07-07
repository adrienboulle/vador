const shared = require('./shared');

module.exports = {
  entry: {
    skills: './.build/private/src/client/app/app.js',
  },
  output: shared.output,
  module: {
    rules: [
      shared.ngRouterLoader(),
      shared.ngRouterLoaderPreset('skills'),
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
