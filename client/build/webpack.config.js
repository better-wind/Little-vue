const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    dash: resolve('src/pages/dashboard/main.js'),
  },

  output: {
    path: resolve('dist'),
  },

  resolve: {
    extensions: ['.js', '.vue', '.json', '.ts'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        include: [resolve('src')]
      },

      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      },

      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ]
  },

  plugins: [
    new VueLoaderPlugin()
  ]
}
