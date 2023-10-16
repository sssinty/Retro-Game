const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
      main: './src/index.js'
  },
  output: {
      filename: '[name].[hash].js',
      path: path.resolve(__dirname, 'dist'),
      clean: true
  },
  plugins: [
      new HtmlWebpackPlugin({
          template: "./src/index.html"
      })
  ],
module: {
  rules: [
  {
    test: /\.html$/,
    use: 'html-loader'
  },
  {
    test: /\.css$/,
    use: ['style-loader', 'css-loader']
  },
  {
    test: /\.(jpg|png|svg|jpeg|gif)$/,
    type: 'asset/resource'
  },
  {
    test: /\.(png|jpg|gif)$/i,
    dependency: { not: ['url'] },
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 8192,
        }
      }
    ],
    type: 'javascript/auto'
  }
  ]
}
};