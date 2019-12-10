const path = require("path");
const rimraf = require("rimraf");
var HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack=require('webpack')
//plugin可以在webapck运行到某个时刻的时候帮你做一些事情

// rimraf.sync('dist')
module.exports = {
  devtool: "source-map",//映射
  mode: "development", //生产或开发环境。代码压缩与否
  devtool:"cheap-module-eval-source-map",//cheap只标注列信息不标注行信息，不带node-module里的错误信息，module
  entry: {
    main: "./app.js",
  },
  //mode: process.env.NODE_ENV,
  output: {
    //   publicPath:'http://cdn.com.cn',
    filename: "[name].js",
    path: path.resolve(__dirname, "dist")
  },
  devServer:{
      contentBase:'./dist',//自动启动的文件夹
      open:true,//自动打开浏览器
      port:8080,
      hot:true,
      //hotOnly:true//html文件没有生效，也不让浏览器自动刷新
  },
  module: {
    rules: [
      {
        test:/\.js$/,
        exclude:/node_modules/,
        loader:'babel-loader'

      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: {
          loader: "url-loader",
          options: {
            name: "[name]_[emoji]_[path].[ext]"
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          //   {
          //     loader: "css-loader",
          //     options: {
          //       importLoaders: 2, //css内引入css时，再次从下到上执行一遍
          //     //  module: true //开启css模块化 代码里面的语法：img.classList.add(style.avatar) style为引入样式 如 import style from '..'
          //     }
          //   },
          "postcss-loader"
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./index.html"
    }),
    new webpack.HotModuleReplacementPlugin( )
  ]
};
