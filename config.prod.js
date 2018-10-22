const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production', // production
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [{
      test: /\.js$/,
      include: /src/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: [
            ['@babel/plugin-proposal-class-properties'],
          ],
        },
      },
    },

    {
      test: /\.css$/,
      use: [
        { loader: MiniCssExtractPlugin.loader },
        {
          loader: 'css-loader',
        },
      ],
    },


    {
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
      include: /src/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10000,
        },
      }],

    },
    ],
  },
  plugins: [
    // webpack 4.0 替代 extract-text-webpack-plugin
    new MiniCssExtractPlugin({
      filename: 'index.css',
    }),
    new HtmlWebpackPlugin({
      title: 'demo',
      template: 'index.html',
      // chunks: ['common', 'index'],
      hash: true,
    }),
  ],
};
