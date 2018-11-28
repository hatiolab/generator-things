const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: {
    "<%= moduleName %>": "./src/index.js",
    "<%= moduleName %>-min": "./src/index.js"
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, '.')
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'node_modules')
    ]
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: [],
      use: [{
        loader: 'babel-loader',
        options: {
          presets: ["@babel/env"]
        }
      }]
    }]
  },
  devServer: {
    contentBase: path.join(__dirname, '.'),
    compress: true,
    port: 8000
  },
  plugins:[
    new UglifyJSPlugin({
      test: /\-min\.js$/
    })
  ]
};
