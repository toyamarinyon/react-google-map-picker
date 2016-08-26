const path = require('path');

module.exports = {
  entry: [
    path.join(__dirname, './example/index.jsx')
  ],
  output: {
    path: path.join(__dirname, './docs'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
      },
      {
        test: /\.s?css$/,
        loaders: ['style', 'css', 'sass']
      },
      {
        test: /\.png$/,
        loaders: ['url']
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        // Limiting the size of the woff fonts breaks font-awesome ONLY for the extract text plugin
        // loader: "url?limit=10000"
        loaders: ['url']
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        loaders: ['file']
      }
    ],
  }
};
