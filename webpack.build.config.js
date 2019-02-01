var webpack = require('webpack');
var loaders = require('./webpack.loaders.js');
module.exports = {
  entry: './src/main.js',
  output: {
    path: __dirname + '/dist',
    filename: 'p5.controller.min.js'
  },
  module: {
    loaders: loaders
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        drop_console: true,
        drop_debugger: true
      }
    })
  ]
};
