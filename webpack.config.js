const path = require("path");
const HtmlPlugin = require("html-webpack-plugin");
const port = process.env.PORT_VUE;

module.exports = {
  mode: "development",
  entry: {
    index: "./index.js"
  },
  devServer: {
    port: port,
    host: "localhost",
    historyApiFallback: true,
    hot: true
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    filename: "[name].[hash].js"
  },
  plugins: [
    new HtmlPlugin({
      filename: "index.html",
      template: "template/index.html",
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader"
      },
      {
        test: /\.vue$/,
        loader: "vue-loader"
      }
    ]
  },
  resolve: {
    extensions: [".js", ".vue"]
  }
};
