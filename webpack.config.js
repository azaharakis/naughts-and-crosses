// webpack.config.js
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: [
    'webpack/hot/dev-server',
    './src/index.js'
  ],
  output: {
    path: './public/',
    publicPath: "/assets/",
    filename: 'js/bundle.js'
  },
  devtool: 'eval',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules|bower_components/,
        loader: "babel-loader",
        query: {
          optional: ["es7.decorators", "es7.classProperties"]
        }
      },
      {
        test: /\.scss|css$/,
        loader: ExtractTextPlugin.extract(
          // activate source maps via loader query
          'css?sourceMap!' +
          'sass?sourceMap'
        )
      }
    ]
  },
  plugins: [
    // extract inline css into separate 'styles.css'
    new ExtractTextPlugin('css/styles.css')
  ]
};
