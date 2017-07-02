const shared = require('./shared');

module.exports = {
  entry: {
    contact: './.build/src/client/app/app.js',
  },
  output: shared.output,
  module: {
    rules: [
      shared.ngRouterLoader(),
      shared.babelLoader,
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
  //plugins: [
  //  shared.UglifyJsPlugin,
  //],
};
