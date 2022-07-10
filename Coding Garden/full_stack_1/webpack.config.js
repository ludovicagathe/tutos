import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
  mode: 'development',
  target: 'web',
  entry: {
    client: [
      path.resolve(__dirname, 'src/client/main.js'),
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    // filename: './js/[name]_[contenthash].js',
    filename: './js/[name].js',
    clean: true
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Main Content",
      filename: "index.html",
      template: path.resolve(__dirname, 'src/client/index.html'),
      inject: false
    })
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist')
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true
  },
  resolve: {
    fallback: {
      //'process': require.resolve('process/browser'),
      'path': require.resolve('path-browserify'),
    },
    alias: {
      path: 'path',
      //process: 'process/browser',
    }
  },
  node: {
    global: true,
    __filename: true,
    __dirname: true,
  }
}
