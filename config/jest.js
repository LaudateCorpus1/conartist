module.exports = {
  'package.json': json(() => ({
    devDependencies: {
      jest: '^20.0.4'
    },
    jest: {
      modulePathIgnorePatterns: ['./node_modules']
    },
    scripts: {
      test: 'jest'
    }
  }))
};
