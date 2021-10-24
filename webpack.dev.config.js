const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin') //installed via npm
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const package = require('./package.json')

module.exports = {
  mode: 'development',
  entry: {
    [package.name]: path.resolve(__dirname, 'src/index.ts'),
    demo: path.resolve(__dirname, 'src/demo/index.ts'),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'umd',
    libraryExport: 'default',
    library: 'EventJS',
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9000,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({  // Also generate a test.html
      filename: 'index.html',
      template: path.join(__dirname, 'public/index.html')
    }),
  ],
}
