# Webpack-4-從零開始實戰手冊 （基礎篇）
![image](https://github.com/vicchoutw/webpack-4-go/blob/master/readme/webpack.png)

</br>

## 前言：
2018年2月底Webpack維護團隊發布了[webpack4](https://webpack.js.org/)。其中移除了像`CommonsChunkPlugin`，預設支援`mode`模式切換等改動進而比起webpack3打包速度有大大的提升。如果你對webpack還很陌生，沒關係，接下來會詳細帶你從無到有了解Webpack的魅力所在。

</br>

## Webpack是什麼？
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

## 前置設定
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

## npm安裝套件
</br>

__安裝之前，先了解npm套件安裝常用指令：__


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
```
devDependencies": {
  "jquery": "^3.3.1"
}
```

</br>

__安裝Webpack__

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

`dev`主要為開發階段使用
* `webpack-dev-server` 開啟本機伺服器來檢視網頁
* `--devtool eval-source-map` 可開啟sourceMap方便調試程式碼
* `--progress` 顯示進度條
* `--colors` 高亮顏色顯示特殊訊息
* `--inline` 網頁加入熱塊，程式碼異動後自動重整網頁
* `--hot` 重新加載改變的部分，不会重整頁面
* `--inline --hot` 同時存在為重新加載改變的部份，HRM失敗則重整頁面

</br>

`build`為輸出階段使用
* 打包輸出網頁，並存放在`dist`資料夾內

</br>

## 設定Webpack.config.js

</br>

Webpack.config.js檔案中設定整個Webpack流程參數，並透過`module.exports` 做輸出。

以下介紹幾個Webpack.config.js重要的設定:

</br>

### entry
在一開始階段需定義入口（讀取的設定檔案來源） `entry: string|Array<string>`

```javascript
module.exports = {
  entry: './resources/global/entry.js'
};
```

此外也可以定義多數chunk做多頁面程序，更多chunk資訊[請參閱](https://webpack.docschina.org/concepts/entry-points/#%E5%A4%9A%E9%A1%B5%E9%9D%A2%E5%BA%94%E7%94%A8%E7%A8%8B%E5%BA%8F)

```javascript
module.exports = {
  entry: {
    chuck1: './resources/global/entry1.js',
    chuck2: './resources/global/entry2.js'
  }
};
```
</br>


entry中指向的檔案為主要的檔案配置，簡單說就是整個專案中哪些檔案是要被使用的。

* entry.js中的配置

```javascript
require('jquery');
require('./sass/common.scss');
require('./js/index.js');
//測試
console.log('test Entry.js!!');

```

可以看到entry.js中除了可以引用js / css檔案外也能自定義任務，譬如可以在terminal中打印`console.log`

</br>

### output

有輸入`entry`相對就有輸出`output`，定義webpack把bundle後的檔案輸出到的目錄位置

```javascript
module.exports = {
  entry: {
    main: './resources/global/entry.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'build.js'
  }
};
```
* `filename` 指定輸出的檔案名稱
* `path` 輸出目錄的絕對路徑，可搭配`path.resolve()`方法將相對路徑轉為絕對路徑，[請參閱](http://javascript.ruanyifeng.com/nodejs/path.html)

</br>

### loader

Webpack的處理流程中皆為Javascript語言，非javascript的原始碼無法正確的在bundle階段做使用。Loader主要在於把不同的原始碼作轉換，譬如Scss源碼可透過Sass-loader / Css-loader輸出為css檔案。Loader詳細說明，[請參閱](https://webpack.docschina.org/concepts/loaders/)


使用loader須透過npm下載，範例中使用 style-loader / css-loader

```
npm i -D style-loader css-loader
```
</br>
使用Loader可以透過下列三種方式：

##### webpack.config.js中設定（推荐）： 

```javascript
module.exports = {
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
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      }
    ]
  }
};
```

</br>

##### `import`中寫入指定loader
```
import Styles from 'style-loader!css-loader?modules!./styles.css';
```

</br>

此外，也可以透過Plugins協助開發者做更多的Bundle處理。

</br>

##### CLI: 透過CLI傳遞參數
```
webpack --module-bind --module-bind 'css=style-loader!css-loader'
```

</br>

推薦幾個實用Loader:
* [Babel-Loader](https://github.com/babel/babel-loader)： ES6轉譯
* [Eslint-Loader](https://github.com/webpack-contrib/eslint-loader)： 程式碼偵錯
</br>

配置如下：
```javascript
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
}
```
</br>

### plugins

同其他自動化流程，更多的特殊需求可以透過插件來達成。主要用於處理loader無法完成的事項。

* 安裝套件，可至[NPM套件管理](https://www.npmjs.com/)網站搜尋
```
npm i -D pluginName
```
</br>
推薦使用的Plugins：

* [CopyWebpackPlugin](https://webpack.js.org/plugins/copy-webpack-plugin/)： 複製或搬移資料夾功能

```javascript
//套件加載
const CopyWebpackPlugin = require('copy-webpack-plugin');

//....

module.exports = {
  plugins: [
    //每次webpack bundle前先行複製or移動資料夾
    new CopyWebpackPlugin([
      {
        from: './resources/global/images/',
        to: './images/',
        //是否強制覆蓋
        force: true
      }
    ])
  ]
}
```
</br>

* [HtmlWebpackPlugin](https://webpack.js.org/plugins/html-webpack-plugin/)： 於Html文檔中自動加載bundle後的檔案（css / js)等等
```javascript
//套件加載
const HtmlWebpackPlugin = require('html-webpack-plugin');

//...

//自動加載css / js檔案並重新建置html檔案
module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ['main'],
      filename: 'index.html',
      template: path.resolve(__dirname, './resources/global/index.html'),
      inject: true
    })
  ]
}
```
</br>

* [CleanWebpackPlugin](https://github.com/johnagan/clean-webpack-plugin)： 移除資料夾

```javascript
//套件加載
const CleanWebpackPlugin = require('clean-webpack-plugin');

//...

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

//....

//每次webpack bundle前先行移除資料夾
module.exports = {
  plugins: [
    new CleanWebpackPlugin(
      cleanFolderInit.target,
      cleanFolderInit.options
    )
  ]
}
```
</br>

* [MiniCssExtractPlugin](https://github.com/webpack-contrib/mini-css-extract-plugin)： 打包Scss檔案成一隻css檔並透過 HtmlWebpackPlugin加載到Html中
> 前身為 `ExtractTextPlugin`。Webpack4後不支援，[請參閱](https://webpack.js.org/plugins/mini-css-extract-plugin/)

```javascript
//套件加載
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

//...

//自動加載css / js檔案並重新建置html檔案
module.exports = {
  plugins: [
    //打包Sass檔案，並透過Sass-loader / css-loader輸出成css檔
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    })
  ]
}
```
</br>

__完整plugin配置如下：__
```javascript
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
    })
  ]
};
```
</br>


### 啟用devServer

`webpack-dev-server` 內建支持`--hot`熱模塊模式，每次重新整個頁面之前，熱模式會嘗試使用 HMR 来更新，[更多關於熱模塊](https://webpack.docschina.org/concepts/hot-module-replacement/)。

devServer用於在開發階段於本機啟用server，[請參閱](https://webpack.docschina.org/configuration/dev-server/)。在package.json中有設定：

```javascript
"scripts": {
  "dev": "webpack-dev-server --devtool eval-source-map --progress --colors --inline --hot",
  "build": "webpack"
}
```

* 啟用webpack時，如果於開發階段則輸入 `npm run dev`，打包輸出階段則輸入 `npm run build`。

* 啟動webpack後會看所有webpack bundle過程中訊息（webpack4 相較舊版本速度提升不少）
</br>

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
  //填入正確IP位置
  host: '192.168.1.123',
  port: 3000
}
```
</br>

檔案有異動時，webpack會監聽並重新做bundle動作並且自動重新整理頁面。

* `host`不啟用則預設網址為：http://localhost/
* 如果`host`有指定IP則訪客可以透過IP連入：http://192.168.1.123/

</br>

__最終完整配置如下：__
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
    host: '192.168.1.123',
    port: 3000
  }
};
```


啟用`devServer`後，webpack的bundle過程中共耗費191ms，並終於顯示頁面瞜～
![image](https://github.com/vicchoutw/webpack-4-go/blob/master/readme/bundleTime.png)

![image](https://github.com/vicchoutw/webpack-4-go/blob/master/readme/bundle.png)

</br>
</br>

## 結尾

Webpack為目前主流前端打包工具，儘管Webpack團隊號稱零配置，但如果要做複雜的應用還是要提身本身的前端能力才能做客製化開發。今天的介紹就到這裡，有時間再來分享Webpack的進階的應用:D










