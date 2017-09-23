const { merge } = require('lodash');

module.exports = opts => {
  opts = merge(
    {
      es: true,
      esnext: true,
      node: '6.0.0'
    },
    opts
  );
  return {
    'config/babel.es.js': opts.es
      ? () => {
          return {
            babelrc: false,
            presets: [['env', { modules: false }], 'flow', 'react', 'stage-0']
          };
        }
      : undefined,
    'config/babel.esnext.js': opts.esnext
      ? () => {
          return {
            babelrc: false,
            presets: ['es2016', 'es2017', 'flow', 'react', 'stage-0']
          };
        }
      : undefined,
    'config/babel.node.js': opts.node
      ? () => {
          return {
            babelrc: false,
            presets: [
              ['env', { targets: { node: opts.node } }],
              'flow',
              'react',
              'stage-0'
            ]
          };
        }
      : undefined,
    '.gitignore': [
      opts.es && '/es',
      opts.esnext && '/esnext',
      opts.node && '/node'
    ].filter(Boolean),
    'package.json': {
      devDependencies: {
        'babel-cli': '^6.24.1',
        'babel-preset-env': '^1.6.0',
        'babel-preset-es2016': '^6.24.1',
        'babel-preset-es2017': '^6.24.1',
        'babel-preset-flow': '^6.23.0',
        'babel-preset-react': '^6.24.1',
        'babel-preset-stage-0': '^6.24.1'
      },
      files: [
        opts.es && 'es/',
        opts.esnext && 'esnext/',
        opts.node && 'node/'
      ].filter(Boolean),
      main: opts.node ? 'node/index.js' : 'src/index.js',
      module: opts.es ? 'es/index.js' : undefined,
      esnext: opts.esnext ? 'esnext/index.js' : undefined,
      scripts: {
        'build:es': opts.es
          ? 'babel --no-babelrc src --out-dir es --presets=$(pwd)/config/babel.es'
          : undefined,
        'build:esnext': opts.esnext
          ? 'babel --no-babelrc src --out-dir esnext --presets=$(pwd)/config/babel.esnext'
          : undefined,
        'build:node': opts.node
          ? 'babel --no-babelrc src --out-dir node --presets=$(pwd)/config/babel.node'
          : undefined
      }
    }
  };
};
