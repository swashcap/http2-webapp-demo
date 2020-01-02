const path = require('path');

const isProdEnv = process.env.NODE_ENV === 'production';

module.exports = {
  entry: './src/index.tsx',
  mode: isProdEnv ? 'production' : 'development',
  module: {
    rules: [
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
