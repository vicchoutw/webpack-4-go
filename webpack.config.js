//套件加載
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

//設定CleanWebpackPlugin參數
let cleanFolderInit = {
  //清除目錄名稱
  target: [
    'build',
    'dist'
  ],
  //配置選項
  options: {
    root: path.resolve('./'),
    verbose: true
    // exclude: ['*.html']
  }
}

module.exports = {
  // Webpack模式，目前設定為development
  mode: 'development',
  // 流程入口位置
  entry: {
    main: './resources/global/entry.js'
  },
  // 輸出位置，filename定義輸出的js檔名
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'build.js'
  },
  module: {
    //設定每個Loader配置
    rules: [
      {
        //Eslint-Loader
        enforce: 'pre',
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'eslint-loader',
        options: {
          emitError: true
        }
      },
      {
        //Babel-Loader
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
        // Sass-loader + css-loader
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  //設定每個Plugins配置
  plugins: [
    //每次webpack bundle前先行移除資料夾
    new CleanWebpackPlugin(
      cleanFolderInit.target,
      cleanFolderInit.options
    ),
    //每次webpack bundle前先行複製or移動資料夾
    new CopyWebpackPlugin([
      {
        from: './resources/global/images/',
        to: './images/',
        //是否強制覆蓋
        force: true
      }
    ]),
    //打包Sass檔案，並透過Sass / Css loader最後輸出成css檔
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    //自動加載css / js檔案並重新建置html檔案
    new HtmlWebpackPlugin({
      chunks: ['main'],
      filename: 'index.html',
      // template: path.resolve(__dirname, `../resource/${env.lang}/${env.name}/${env.name}.pug`),
      template: path.resolve(__dirname, './resources/global/index.html'),
      // data: require(`../resource/${env.lang}/${env.name}/${env.name}.json`),
      inject: true
    })
  ],
  //localHost server配置
  devServer: {
    //顯示警告or錯誤訊息
    overlay: {
      warnings: true,
      errors: true
    },
    //每次bundle結束後自動開啟頁面
    open: true,
    //開啟的頁面名稱
    openPage: 'index.html',
    compress: true,
    //是否持續監聽指定目錄下所有檔案異動
    watchContentBase: true,
    //監聽指定目錄名稱
    contentBase: path.join(__dirname, './resources/global/'),
    //填入正確IP位置
    // host: '192.168.1.123',
    port: 3000
  }
}