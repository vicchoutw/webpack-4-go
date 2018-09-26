# Webpack-4-從零開始實戰手冊 part01

### 前言：
2017年2月底Webpack維護團隊發布了webpack4。其中移除了像`CommonsChunkPlugin`，預設支援`mode`模式切換等改動進而比起webpack3打包速度有大大的提升。如果你對webpack還很陌生，沒關係，接下來會詳細帶你從無到有了解Webpack的魅力所在。

### Webpack是什麼？
由於以往前端工程師在撰寫css，javascript甚至是整理資料夾結構等等需要耗費很多瑣碎時間。身為工程師就是要懶，我們的時間很寶貴（不想加班），因此才會有自動化打包工具的出現以輔助前端工程師開發網站。其中Webpack是目前最夯的bundle工具，其他的還有ex: Gulp / Grunt / Parcel 等等。

Webpack優點如下：
* 龐大的維護團隊
* 一切檔案皆模組化
* 打包速度快
* 少量的設定開箱即用

缺點：
* 只適合模組化的網站
* 複雜的用途設定較難
