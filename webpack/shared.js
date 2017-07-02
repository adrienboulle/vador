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

  resolveLoader: {
    alias: {
      'ng-router-loader-preset': path.join(__dirname, './ng-router-loader-preset'),
    },
  },

  output: {
    path: path.join(__dirname, '../.build/public/js/'),
    filename: '[name]-[hash]-bundle.js',
    chunkFilename: '[chunkhash]-bundle.js',
    publicPath: '/js/',
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

  ngRouterLoaderPreset: entry => (
    {
      test: /\.js$/,
      use: [
        {
          loader: 'ng-router-loader-preset',
          options: {
            entry,
          },
        },
      ],
    }
  ),
};
