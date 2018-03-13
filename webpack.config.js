const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ExtractCss = new ExtractTextPlugin({ filename: 'main.css', disable: false, allChunks: true });
const ROOT_PATH = path.resolve(__dirname);

const DEBUG = !(process.env.NODE_ENV === 'production');
const DEV_PORT = 8000;
const DEV_HOST = 'localhost';

/* LOGGER */
process.stdout.write('==================================================================\n');
process.stdout.write('==================================================================\n');
process.stdout.write(`NODE_ENV: ${process.env.NODE_ENV}\n`);
process.stdout.write(`DEBUG: ${DEBUG}\n`);
process.stdout.write(`ROOT_PATH: ${ROOT_PATH}\n`);
if (process.env.NODE_ENV !== 'production') {
  process.stdout.write('Dev server running on:\n');
  process.stdout.write(`PORT: ${DEV_PORT}\n`);
  process.stdout.write(`HOST: ${DEV_HOST}\n`);
}
process.stdout.write('==================================================================\n');
process.stdout.write('==================================================================\n\n\n');
/* LOGGER */


module.exports = {
  target: 'web',
  entry: path.resolve(ROOT_PATH, './src/index.js'),
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: [/node_modules/],
        use: [
          { loader: 'react-hot-loader' },
          { loader: 'babel-loader' },
        ],
      },
      {
        test: /\.scss$/,
        use: ExtractCss.extract({
          use: [ 'css-loader', 'sass-loader' ],
        }),
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ],
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        use: [
          { loader: 'json-loader' },
        ],
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg)(.*)?$/,
        use: [
          {
            loader: 'url-loader?limit=30000&name=[name].[hash:20].[ext]',
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: DEBUG ? '[name].js' : '[name].[hash].js',
  },
  devServer: {
    port: DEV_PORT,
    host: DEV_HOST,
    contentBase: './dist/',
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      production: process.env.NODE_ENV === 'production',
      title: 'Ring',
      template: './src/index.html',
    }),
    ExtractCss,
  ],
};
