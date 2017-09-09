const { merge } = require('lodash');
const fs = require('fs');
const minimatch = require('minimatch');
const outdent = require('outdent');
const path = require('path');
const prettier = require('prettier');
const yargs = require('yargs');

const cli = yargs.argv;
const has = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);

function prettierFormat(code, opts) {
  return prettier.format(
    code,
    Object.assign({}, { parser: 'babylon', singleQuote: true }, opts)
  );
}

function js(data, file) {
  const upPaths = path
    .dirname(file)
    .split('/')
    .map(() => '../')
    .join('');
  return prettierFormat(
    outdent`
      const fs = require('fs');
      const key = '${file}';
      module.exports = require('${upPaths}./conartist.js')[key].data();
    `
  );
}

function json(data) {
  return prettierFormat(JSON.stringify(data), {
    parser: 'json'
  });
}

function string(data) {
  return `${data}`;
}

class Format {
  constructor(file, data, func) {
    this.data = data;
    this.file = file;
    this.func = func;
  }
  process() {
    return this.func(this.data, this.file);
  }
}

const handlers = {
  '*.js': js,
  '*.json': json,
  '.*': string,
  '*': string
};

function config(...args) {
  const obj = merge(...args);
  for (const key in obj) {
    if (has(obj, key)) {
      obj[key] = new Format(key, obj[key], locateHandler(key));
    }
  }
  return obj;
}

const minimatchOptions = {
  dot: true,
  matchBase: true
};

function locateHandler(key) {
  for (const pattern in handlers) {
    if (has(handlers, pattern) && minimatch(key, pattern, minimatchOptions)) {
      return handlers[pattern];
    }
  }
  throw new Error(`Could not find a handler for "${key}".`);
}

module.exports = {
  config,
  handlers
};
