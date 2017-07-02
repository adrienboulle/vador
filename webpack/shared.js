const path = require('path');
const webpack = require('webpack');

module.exports = {
  UglifyJsPlugin: new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
    },
    output: {
      comments: false,
    },
  }),

  output: {
    path: path.join(__dirname, '../.build/public/'),
    filename: '[name]-bundle.js',
    publicPath: '/',
  },

  babelLoader: {
    test: /\.js$/,
    loader: 'babel-loader?presets[]=es2015',
  },

  ngRouterLoader: loaderType => {
    const loader = {
      test: /\.js$/,
      use: [
        {
          loader: 'ng-router-loader',
          options: {
            aot: true,
          },
        },
      ],
    };

    if (loaderType) {
      loader.use[0].options.loader = loaderType;
    }

    return loader;
  },
};
