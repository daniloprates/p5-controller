module.exports = [
  {
    test: /\.js$/,
    exclude: /(node_modules|bower_components)/,
    loader: 'babel?presets[]=es2015'
  },
  {
    test: /\.json$/,
    exclude: /(node_modules|bower_components)/,
    loader: "json-loader"
  },
  {
    test: /\.scss$/,
    exclude: /(node_modules|bower_components)/,
    loaders: ["style", "css", "sass"]
  },
  {
    test: /\.css$/,
    exclude: /(node_modules|bower_components)/,
    loader: "style-loader!css-loader"
  },
  {
    test: /\.png$/,
    exclude: /(node_modules|bower_components)/,
    loader: "url-loader?limit=100000"
  },
  {
    test: /\.jpg$/,
    exclude: /(node_modules|bower_components)/,
    loader: "file-loader"
  }
];
