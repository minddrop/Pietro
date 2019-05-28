const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const port = process.env.PORT_VUE
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js'
  },
  devServer: {
    port: port,
    host: 'localhost',
    historyApiFallback: true,
    hot: true
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[hash].js'
  },
  plugins: [
    new HtmlPlugin({
      filename: 'index.html',
      template: 'template/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    }),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      REDIRECT_URI: JSON.stringify(process.env.REDIRECT_URI)
    })
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [{ loader: 'vue-loader', options: { sourceMap: true } }]
      },
      {
        test: /\.js$/,
        use: [{ loader: 'babel-loader', options: { sourceMap: true } }]
      },
      {
        test: /\.s?css$/,
        use: [
          'vue-style-loader',
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue']
  }
}
