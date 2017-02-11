'use strict';

const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './browser/react/index.js',
  output: {
    path: __dirname,
    filename: './public/bundle.min.js',
  },
  context: __dirname,
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),  
    new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        mangle: {
            screw_ie8: true,
            keep_fnames: true
        },
        compress: {
            screw_ie8: true
        },
        comments: false
    }),
  ],
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
          presets: [
            'react',
            ['es2015', { 'modules': false }],
            'stage-2'
          ],
          plugins: ['transform-object-rest-spread']
        }
      }
    ]
  },
  // resolve: {
  //   modules: [ path.join(__dirname, 'node_modules') ]
  // }
};
