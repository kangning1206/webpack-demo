const Webpack = require('webpack');
const webpackConfig = require('../config.prod');
// 使用配置编译
const compiler = Webpack(webpackConfig);
// 执行打包
compiler.run((err, stats) => {
  // ...
});
