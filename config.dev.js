const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
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
        { loader: 'style-loader' },
        {
          loader: 'css-loader',
        },
      ],
    },

    // {
    //   test: /\.(less)$/,
    //   exclude: /node_modules/,
    //   use: ExtractTextPlugin.extract({
    //     fallback: 'style-loader',
    //     use: [
    //       { loader: 'css-loader' },
    //       { loader: 'less-loader' }
    //     ],
    //   })
    // },
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


    new HtmlWebpackPlugin({
      title: 'demo',
      template: 'index.html',
      hash: true,
    }),
  ],
};
