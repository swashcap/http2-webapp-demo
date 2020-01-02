const path = require('path');

const isProdEnv = process.env.NODE_ENV === 'production';

module.exports = {
  entry: './src/index.ts',
  mode: isProdEnv ? 'production' : 'development',
  module: {
    rules: [
      {
        exclude: /node_modules/,
        loader: 'babel-loader',
        test: /\.(js|jsx|ts|tsx)$/,
      },
    ],
  },
  output: {
    chunkFilename: isProdEnv ? '[id].[chunkhash].chunk.js' : '[id].chunk.js',
    filename: isProdEnv ? '[name].[contenthash].bundle.js' : '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', 'tsx', '.js', '.jsx', '.json'],
  },
};
