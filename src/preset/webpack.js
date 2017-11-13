const { merge } = require('../merge');

const webpack = opts => {
  opts = merge(
    {
      jsx: 'h'
    },
    opts
  );
  return {
    'package.json': {
      devDependencies: {
        'babel-core': '^6.26.0',
        'babel-loader': '^7.1.2',
        'babel-plugin-transform-react-jsx': '^6.24.1',
        'babel-preset-env': '^1.6.1',
        'babel-preset-flow': '^6.23.0',
        'babel-preset-react': '^6.24.1',
        'babel-preset-stage-0': '^6.24.1',
        webpack: '^3.8.1',
        'webpack-dev-server': '^2.9.4'
      }
    },
    'webpack.config.js'() {
      const path = require('path');
      const webpack = require('webpack');
      const contextPath = path.join(__dirname, 'src');
      const publicPath = path.join(__dirname, 'public');
      return {
        context: contextPath,
        devServer: {
          compress: true,
          contentBase: publicPath,
          historyApiFallback: true,
          open: true
        },
        devtool: 'source-map',
        entry: './index.js',
        module: {
          rules: [
            {
              test: /\.js$/,
              use: {
                loader: 'babel-loader',
                options: {
                  plugins: [
                    opts.jsx
                      ? ['transform-react-jsx', { pragma: opts.jsx }]
                      : undefined
                  ],
                  presets: ['env', 'flow', 'react', 'stage-0']
                }
              }
            },
            {
              test: /\.(html)/,
              loaders: 'file-loader?{ name: "[path][name].[ext]"}'
            }
          ]
        },
        output: {
          filename: 'chunk.[name].js',
          path: publicPath,
          publicPath: '/'
        },
        plugins: [
          new webpack.optimize.CommonsChunkPlugin({
            children: true,
            deepChildren: true,
            filename: 'index.js',
            minChunks: 2,
            name: 'index'
          })
        ]
      };
    }
  };
};
