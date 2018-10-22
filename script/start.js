const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('../config.dev');

const compiler = Webpack(webpackConfig);
const devServerOptions = Object.assign({}, webpackConfig.devServer, {
  stats: {
    colors: true,
  },
  after(app) {
    console.log('启动了');
  },
  // publicPath: "/public/", //bundle.js 位置
  headers: {
    'X-Custom-myheader': 'myheader',
  },
  hot: true, // 启用 webpack 的模块热替换特性
  hotOnly: true, // 无序刷新
  inline: true,
  index: 'index.html',
  // public:'aa',
  // publicPath:'/', //访问bundle.js路径前缀
  // openPage:'/public',
  compress: true,
  // contentBase: './public',
  progress: true,
});

const server = new WebpackDevServer(compiler, devServerOptions);
server.listen(8080, '127.0.0.1', () => {
  console.log('Starting server on http://localhost:8080');
});
