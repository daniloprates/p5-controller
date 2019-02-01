var path = require('path');
var loaders = require('./webpack.loaders.js');
module.exports = {
  entry: './src/main.js',
  output: {
    path: __dirname + '/dist',
    filename: 'p5.controller.js'
  },
  module: {
    loaders: loaders
  }
};
