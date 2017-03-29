var path = require('path');
var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');

var wpackConfig = require("./webpack.config");

//Use 0.0.0.0, so that this can bind to any network interfaces (IP Address)
wpackConfig.entry.app.unshift(
  "webpack-dev-server/client?http://0.0.0.0:8080/",
  "webpack/hot/dev-server");

wpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

var wpackCompiler = webpack(wpackConfig);

var wpackServer = new webpackDevServer(wpackCompiler, {
  contentBase: path.join(__dirname, 'webclient'),
  publicPath: wpackConfig.output.publicPath,
  hot: true,
  watchOptions: {
  aggregateTimeout: 300,
  poll: 1000 // is this the same as specifying --watch-poll?
}
});
wpackServer.listen(8080, '0.0.0.0', function(err, result) {
  if (err) {
    console.error("Error ", err);
  }

  console.log("Server started at 8080");
});
