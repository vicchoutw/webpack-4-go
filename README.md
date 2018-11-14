# Webpack-4-從零開始實戰手冊 part01
![image](https://github.com/vicchoutw/webpack-4-go/blob/master/readme/webpack.png)

</br>

### 前言：
2018年2月底Webpack維護團隊發布了[webpack4](https://webpack.js.org/)。其中移除了像`CommonsChunkPlugin`，預設支援`mode`模式切換等改動進而比起webpack3打包速度有大大的提升。如果你對webpack還很陌生，沒關係，接下來會詳細帶你從無到有了解Webpack的魅力所在。

</br>

### Webpack是什麼？
由於以往前端工程師在撰寫css，javascript甚至是整理資料夾結構等等需要耗費很多瑣碎時間。身為工程師就是要懶，我們的時間很寶貴（不想加班），因此才會有自動化打包工具的出現以輔助前端工程師開發網站。其中Webpack是目前最夯的bundle工具，其他的還有ex: [Gulp](https://github.com/gulpjs/gulp) / [Grunt](https://github.com/gruntjs/grunt) / [Parcel](https://github.com/parcel-bundler) 等等。

Webpack優點如下：
* 龐大的維護團隊
* 一切檔案皆模組化
* 打包速度快
* 少量的設定開箱即用

缺點：
* 只適合模組化的網站
* 複雜的用途設定較難

</br>

### 前置設定
1. 安裝node 8.x版，範例使用8.8.0版
[下載連結](https://nodejs.org/en/download/)

</br>

2. 開啟命令提示方塊輸入指令，Mac則開啟Terminal檢查安裝後node版本號
```
 node -v //顯示v8.8.0，
```

</br>

3. 資料夾準備

![image](https://github.com/vicchoutw/webpack-4-go/blob/master/readme/file.png)
> _webpack.config.js為webpack設定檔預設命名，無特殊需求建議不要改。_

</br>

4. 建制package.json檔
```
 npm init
```
> _一路Enter到底後，會發現專案目錄下產生了package.json檔_

</br>

### npm安裝套件

</br>

#### 在安裝之前，先了解npm套件安裝常用指令：

1. 安裝 `install` 縮寫 `i`:
```
 npm i pluginName
```

</br>

2. 全域安裝 `-global` 縮寫 `-g`，儲存在電腦本機中，所有專案皆可使用
```
 npm i -g pluginName
```

</br>

3. 安裝到專案目錄下並寫入package.json，於專案目錄下產生node_modules資料夾存放套件檔案： `--save-dev` 縮寫 `-D`
```
 npm i -D pluginName
```

安裝後會發現package.json中的`"devDependencies"`記錄了套件名稱與版本
```javascript
devDependencies": {
  "jquery": "^3.3.1"
}
```

</br>

#### 安裝Webpack

1. 全域安裝`webpack`，`webpack-cli`，`webpack-dev-server` 三個套件
```
 npm i -g webpack webpack-cli webpack-dev-server
```
> _第一次使用Webpack需全域安裝，之後則免再安裝_

</br>

2. 專案目錄下安裝`webpack`，`webpack-cli`，`webpack-dev-server` 三個套件
```
 npm i -D webpack webpack-cli webpack-dev-server
```

</br>

3. 修改package.json的`"scripts"`如下
```javascript
"scripts": {
  "dev": "webpack-dev-server --devtool eval-source-map --progress --colors --inline --hot",
  "build": "webpack"
}
```

</br>

"dev"主要為開發階段使用
* `webpack-dev-server` 開啟本機伺服器來檢視網頁
* `--devtool eval-source-map` 可開啟sourceMap方便調試程式碼
* `--progress` 顯示進度條
* `--colors` 高亮顏色顯示特殊訊息
* `--inline` 網頁加入熱塊，程式碼異動後自動重整網頁
* `--hot` 重新加載改變的部分，不会重整頁面
* `--inline --hot` 同時存在為重新加載改變的部份，HRM失敗則重整頁面

</br>

"build"為輸出階段使用
* 打包輸出網頁，並存放在`dist`資料夾內

</br>

### Webpack.config.js設定

</br>

Webpack.config.js檔案中設定整個Webpack流程參數。
Webpack的處理流程中一切皆為Javascript語言，譬如Scss檔案再轉譯階段需要透過不同的Loader作轉換，最後輸出為css檔案。
詳細說明可參考 [Loader](https://webpack.docschina.org/concepts/loaders/)
此外，也可以透過Plugins協助開發者做更多的Bundle處理。

</br>

範例中使用的Plugins：
* [CopyWebpackPlugin](https://webpack.js.org/plugins/copy-webpack-plugin/)： 複製或搬移資料夾功能
* [HtmlWebpackPlugin](https://webpack.js.org/plugins/html-webpack-plugin/)： 於Html文檔中自動補上bundle的檔案（css / js)等等
* [CleanWebpackPlugin](https://github.com/johnagan/clean-webpack-plugin)： 移除資料夾
* [MiniCssExtractPlugin](https://github.com/webpack-contrib/mini-css-extract-plugin)： 打包Scss檔案成一隻css檔並透過 HtmlWebpackPlugin加載到Html中

Loader:
* [Babel-Loader](https://github.com/babel/babel-loader)： ES6轉譯
* [Eslint-Loader](https://github.com/webpack-contrib/eslint-loader)： 程式碼偵錯

</br>

#### Webpack.config 配置如下：
```javascript
const path = require('path');
//套件加載
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
    verbose: true,
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
          emitError: true,
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
        ],
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
      chunkFilename: '[id].css',
    }),
    //自動加載css / js檔案並重新建置html檔案
    new HtmlWebpackPlugin({
      chunks: ['main'],
      filename: 'index.html',
      template: path.resolve(__dirname, './resources/global/index.html'),
      inject: true
    }),
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
    port: 3000
  }
};
```
</br>

entry中指向的檔案為主要的檔案配置，簡單說就是整個專案中哪些檔案是要被使用的。

```
// 流程入口位置
  entry: {
    main: './resources/global/entry.js'
  },
```

#### entry.js中的配置

```
require('jquery');
require('./sass/common.scss');
require('./js/index.js');
console.log('test Entry.js!!');

```

可以看到entry.js中除了可以引用js / css檔案外也能自定義任務，譬如可以在terminal中打印console.log

</br>


### 啟用devServer並開始開發

由於在package.json中有設定：
```jsvascript
"scripts": {
  "dev": "webpack-dev-server --devtool eval-source-map --progress --colors --inline --hot",
  "build": "webpack"
}
```

啟用webpack時，如果於開發階段則輸入 `npm run dev`，打包輸出階段則輸入 `npm run build`。
啟動webpack後會看所有webpack bundle過程中訊息（webpack4 相較舊版本速度提升不少）

在webpack.config中可定義devServer配置參數，如下：
```javascript
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
    port: 3000
  }
```
</br>

檔案有異動時，webpack會監聽並重新做bundle動作並且自動重新整理頁面。
預設網址為：http://localhost:3000/

***

以上為webpack基本介紹與配置設定！ 感謝！
</br>
未完..待續









