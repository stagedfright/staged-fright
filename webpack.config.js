'use strict';

const webpack = require('webpack');

module.exports = {
  entry: './src/browser/react/index.js',
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  context: __dirname,
  devtool: 'source-map',
  module: {
    noParse: [
      /node_modules\/aframe\/dist\/aframe-master.js/
    ],
    rules: [
      {
        test: /jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets:  [
            'react',
            ['es2015', { 'modules': false }],
            'stage-2'
          ],
          plugins: ['transform-object-rest-spread']
        }
      }
    ]
  }
};
