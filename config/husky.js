const { json } = require('..');
module.exports = {
  'package.json': json(() => ({
    devDependencies: {
      husky: '^0.13.3',
      'lint-staged': '^4.0.2'
    },
    'lint-staged': {
      '*.(js|json)': ['prettier --write', 'git add']
    }
  }))
};
