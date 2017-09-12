const { merge } = require('lodash');
module.exports = opts => {
  opts = merge(
    {
      es: true,
      esnext: true,
      node: true
    },
    opts
  );
  return {
    'config/babel.es.js': opts.es
      ? () => {
          return {
            presets: [['env', { modules: false }], 'react', 'stage-0']
          };
        }
      : undefined,
    'config/babel.esnext.js': opts.esnext
      ? () => {
          return {
            presets: [['env', { es2015: false }], 'react', 'stage-0']
          };
        }
      : undefined,
    'config/babel.node.js': opts.node
      ? () => {
          return {
            presets: [
              ['env', { targets: { node: process.version } }],
              'react',
              'stage-0'
            ]
          };
        }
      : undefined,
    '.gitignore': [
      opts.es ? '/es' : undefined,
      opts.esnext ? '/esnext' : undefined,
      opts.node ? '/node' : undefined
    ],
    'package.json': {
      devDependencies: {
        'babel-cli': '^6.24.1',
        'babel-preset-env': '^1.6.0',
        'babel-preset-react': '^6.24.1',
        'babel-preset-stage-0': '^6.24.1'
      },
      files: [
        opts.es ? 'es/' : undefined,
        opts.esnext ? 'esnext/' : undefined,
        opts.node ? 'node/' : undefined
      ],
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
