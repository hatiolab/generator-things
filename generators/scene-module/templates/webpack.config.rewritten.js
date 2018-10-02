const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const path = require('path');

module.exports = {
  // Tell Webpack which file kicks off our app.
  entry: {
    "things-scene-billboard": "./src/index.js",
    "things-scene-billboard-min": "./src/index.js"
  },
  // Tell Weback to output our bundle to ./[name].js
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, '.')
  },
  // Tell Webpack which directories to look in to resolve import statements.
  // Normally Webpack will look in node_modules by default but since we’re overriding
  // the property we’ll need to tell it to look there in addition to the
  // bower_components folder.
  resolve: {
    modules: [
      path.resolve(__dirname, 'node_modules')
    ]
  },
  // These rules tell Webpack how to process different module types.
  // Remember, *everything* is a module in Webpack. That includes
  // CSS, and (thanks to our loader) HTML.
  module: {
    rules: [{
      // If you see a file that ends in .html, send it to these loaders.
      test: /\.html$/,
      // This is an example of chained loaders in Webpack.
      // Chained loaders run last to first. So it will run
      // polymer-webpack-loader, and hand the output to
      // babel-loader. This let's us transpile JS in our `<script>` elements.
      use: [
        { loader: 'babel-loader' },
        { loader: 'polymer-webpack-loader' }
      ]
    }, {
      // If you see a file that ends in .js, just send it to the babel-loader.
      test: /\.js$/,
      exclude: [],
      use: [{
        loader: 'babel-loader',
        options: {
          presets: ["es2015"]
        }
      }]
    }]
  },
  // Enable the Webpack dev server which will build, serve, and reload our
  // project on changes.
  devServer: {
    contentBase: path.join(__dirname, 'demo'),
    compress: true,
    port: 8000
  },
  plugins:[
    new UglifyJSPlugin({
      test: /\-min\.js$/
    }),
    // This plugin will generate an index.html file for us that can be used
    // by the Webpack dev server. We can give it a template file (written in EJS)
    // and it will handle injecting our bundle for us.
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.ejs')
    }),
    // This plugin will copy files over to ‘./dist’ without transforming them.
    // That's important because the custom-elements-es5-adapter.js MUST
    // remain in ES2015. We’ll talk about this a bit later :)
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, 'bower_components/webcomponentsjs/*.js'),
      to: 'bower_components/webcomponentsjs/[name].[ext]'
    }])
  ]
};
