'use strict';

const webpack = require('webpack');

module.exports = {
  entry: './browser/react/index.js',
  output: {
    path: __dirname,
    filename: './public/bundle.min.js'
  },
  plugins: [ //for production build
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({minimize: true})
  ],
  context: __dirname,
  devtool: 'source-map',
  module: {
    noParse: [
      /node_modules\/aframe\/dist\/aframe.js/
    ],
    loaders: [
      {
        test: /jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-2'],
          plugins: ['transform-object-rest-spread']
        }
      }
    ]
  }
};
