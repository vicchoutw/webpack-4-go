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
 npm i
```

</br>

全域安裝 `-global` 縮寫 `-g`，儲存在電腦本機中，其他專案皆可使用
```
 npm i -g pluginName
```

</br>

安裝到專案目錄下並寫入package.json，於專案目錄下產生node_modules資料夾存放套件檔案： `--save-dev` 縮寫 `-D`
```
 npm i -D pluginName
```

</br>

安裝後會發現package.json中的`"devDependencies"`記錄了套件名稱與版本
```
devDependencies": {
  "jquery": "^3.3.1"
}
```




