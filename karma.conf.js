module.exports = function(config) {
  config.set({
    browsers: ['PhantomJS'],
    files: [
        { pattern: 'test/tests.webpack.js', watched: false },
    ],
    frameworks: ['jasmine'],
    preprocessors: {
      'test/tests.webpack.js': ['webpack','sourcemap'],
    },
    reporters: ['progress'],
    singleRun: true,
    webpack: {
      devtool: 'eval',
      module: {
        loaders: [
          { test: /\.js?$/, exclude: /node_modules/, loader: 'babel-loader' },
        ],
      },
      watch: true,
    },
    webpackServer: {
      noInfo: true,
    },
  });
};
