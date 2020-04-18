const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
   entry: {
      main: path.resolve(__dirname, 'src', 'index.jsx')
   },
   output: {
      path: path.join(__dirname, 'dist'),
      publicPath: '/',
      filename: 'js/bundle.js'
   },
   mode: 'development',
   // mode: 'production',
   devtool: 'inline-cheap-module-source-map', 
   devServer: {
      contentBase: './dist',
      port: 3000,
      hot: true,
      open: true,
      historyApiFallback: true,
      proxy: {
         '/api': {
            target: 'http://localhost:3300',   
            secure: false,
            changeOrigin: true,
         }
      },
   },
   module: {
      rules: [
         {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
               presets: ['@babel/preset-env', '@babel/preset-react'],
               plugins: [
                  [
                     '@babel/plugin-proposal-class-properties', {'loose': true}
                  ]
               ]
            }
         },
         {
            test: /\.css$/,
            use: [
               {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                     publicPath: '../',
                     hmr: process.env.NODE_ENV === 'development',
                  },
               },
               'css-loader',
            ],
         },
         {
            test: /\.(ttf|woff|woff2|eot)$/,
            use: ['file-loader'],
         }
      ]
   },
   plugins: [
      new MiniCssExtractPlugin({
         filename: 'css/[name].css',
         chunkFilename: '[id].css',
         ignoreOrder: false
      }),
      new HtmlWebpackPlugin({
         filename: 'index.html',
         template: 'src/index.html',
      })
   ]
}