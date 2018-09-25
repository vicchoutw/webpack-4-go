const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let cleanFolderInit = {
  target: [
    'build',
    'dist'
  ],
  options: {
    root: path.resolve('./'),
    verbose: true,
    // exclude: ['*.html']
  }
}

module.exports = {
  mode: 'development',
  entry: {
    main: './resources/global/entry.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'eslint-loader',
        options: {
          emitError: true,
        }
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [require('@babel/plugin-proposal-object-rest-spread')]
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ],
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(
      cleanFolderInit.target,
      cleanFolderInit.options
    ),
    new CopyWebpackPlugin([
      {
        from: './resources/global/images/',
        to: './images/',
        force: true
      }
    ]),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new HtmlWebpackPlugin({
      chunks: ['main'],
      filename: 'index.html',
      // template: path.resolve(__dirname, `../resource/${env.lang}/${env.name}/${env.name}.pug`),
      template: path.resolve(__dirname, './resources/global/index.html'),
      // data: require(`../resource/${env.lang}/${env.name}/${env.name}.json`),
      inject: true
    }),
  ],
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    },
    open: true,
    openPage: 'index.html',
    compress: true,
    watchContentBase: true,
    contentBase: path.join(__dirname, './resources/global/'),
    port: 3000
  }
};