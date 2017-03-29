var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: [path.join(__dirname, "webclient", "clientapp.jsx")]
  },
  output: {
    path: path.join(__dirname, "webclient", "dist"),
    publicPath: "/dist/",
    filename: "bundle.js"
  },
  module: {
        loaders: [
            {
                test: /\.jsx$/,
                loaders: ['babel?presets[]=react,presets[]=es2015,presets[]=stage-0']
            }, {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: ['file-loader']
            }
        ]
  },
  node: {
  net: "empty",
  fs: "empty"
  },
  watch:true,
  resolve: {
    extensions: ['', '.js', '.jsx', '/index.js', '/index.jsx']
  },
  plugins: [new HtmlWebpackPlugin({ template: path.resolve('./webclient/index.html') })]
}
