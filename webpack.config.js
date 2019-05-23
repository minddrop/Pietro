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
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"]
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".js"]
  }
};
