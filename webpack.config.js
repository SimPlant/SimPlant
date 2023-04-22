const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const process = require('process');

module.exports = {
  entry: { src: './src/app/index.js' },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
  mode: process.env.NODE_ENV,
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'public'),
      publicPath: '/',
    },
    proxy: {
      '/': {
        target: 'http://localhost:3000',
        secure: false,
      },
    },
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: 'defaults' }],
              ['@babel/preset-react'],
            ],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin()],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
