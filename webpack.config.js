const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WepbackManifestPlugin = require('webpack-manifest-plugin');
const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');

const isProdEnv = process.env.NODE_ENV === 'production';

const config = {
  mode: isProdEnv ? 'production' : 'development',
  module: {
    rules: [
      {
        oneOf: [
          {
            exclude: /node_modules/,
            test: /\.tsx?$/,
            use: {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
              },
            },
          },
          {
            test: /\.css$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  hmr: !isProdEnv,
                },
              },
              'css-loader',
            ],
          },
          {
            exclude: /\.(css|js|jsx|json|ts|tsx)$/,
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  optimization: {
    sideEffects: true,
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
};

module.exports = [
  {
    ...config,
    entry: {
      browser: './src/browser.tsx',
    },
    output: {
      ...config.output,
      chunkFilename: isProdEnv ? '[id].[chunkhash].chunk.js' : '[id].chunk.js',
      filename: isProdEnv
        ? '[name].[contenthash].bundle.js'
        : '[name].bundle.js',
    },
    plugins: [
      new MiniCssExtractPlugin({
        chunkFilename: isProdEnv
          ? '[id].[chunkhash].chunk.css'
          : '[id].chunk.css',
        filename: isProdEnv ? '[name].[contenthash].css' : '[name].css',
      }),
      new WepbackManifestPlugin(),
    ],
  },
  {
    ...config,
    entry: {
      server: './src/server.tsx',
    },
    externals: [
      webpackNodeExternals(),
      {
        '../dist/manifest.json': 'require("./manifest.json")',
      },
    ],
    optimization: {
      ...config.optimization,
      minimize: false,
    },
    target: 'node',
  },
];
