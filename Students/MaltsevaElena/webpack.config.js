const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

module.exports = {
   context: path.resolve(__dirname, 'src'),
   entry: {
      main: './index.jsx'
   },
   output: {
      path: path.join(__dirname, 'public'),
      filename: 'js/bundle.js'
   },
   mode: isDev ? 'development' : 'production',
   devtool: isDev ? 'inline-cheap-module-source-map' : '', 
   devServer: {
      contentBase: './dist',
      port: 3000,
      hot: isDev,
      open: false,
      historyApiFallback: true,
      proxy: {
         '/api': {
            target: 'http://localhost:3300',
            secure: false,
            changeOrigin: true,
         }
      },
   },
   plugins: [
      new MiniCssExtractPlugin({
         filename: 'styles/[name].css',
         chunkFilename: '[id].css',
         ignoreOrder: false
      }),
      new HtmlWebpackPlugin({
         template: './index.html',
         minify: {
            collapseWhitespace: isProd
         }
      }),
      new CopyWebpackPlugin([
         {
            from: path.resolve(__dirname, 'src', 'assets', 'favicon.ico'),
            to: path.resolve(__dirname, 'public', 'images')
         }
      ])
   ],
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
                     '@babel/plugin-proposal-class-properties', 
                     { 
                        'loose': true
                     }
                  ],
                  [
                     'babel-plugin-transform-imports',
                     {
                        '@material-ui/core': {
                           'transform': '@material-ui/core/esm/${member}',
                           'preventFullImport': true
                        },
                        '@material-ui/icons': {
                           'transform': '@material-ui/icons/esm/${member}',
                           'preventFullImport': true
                        },
                        '@material-ui/lab': {
                           'transform': '@material-ui/lab/esm/${member}',
                           'preventFullImport': true
                        }
                     }
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
                     hmr: isDev,
                  },
               },
               'css-loader',
            ],
         },
         {
            test: /\.(ttf|woff|woff2|eot)$/,
            use: [
               {
                  loader: 'file-loader',
                  options: {
                     name: '[name].[ext]',
                     outputPath: "fonts",
                     useRelativePath: true,
                  }
               },
            ],
         },
      ]
   },
}