const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const package = require('./package.json')

module.exports = {
  mode: 'production',
  entry: {
    [package.name]: path.resolve(__dirname, 'src/index.ts'),
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
    library: 'DraggableSlider',
  },
  plugins: [
    new CleanWebpackPlugin(),
  ],
}
