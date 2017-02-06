'use strict';

const webpack = require('webpack');
const PROD = JSON.parse(process.env.PROD_ENV || '0');

module.exports = {
  entry: './browser/react/index.js',
  output: {
    path: __dirname,
    filename: PROD ? './public/bundle.min.js' : './public/bundle.js'
  },
  plugins: PROD ? [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  ] : [],
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
