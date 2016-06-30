var path = require('path');
var fs = require('fs');

var appRoot = 'src/';
var pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
// your main file which exports only configure and other modules.
// usually packageName or 'index.js'
var entryFileName = pkg.name + '.js';

module.exports = {
  root: appRoot,
  source: appRoot + '**/*.js',
  tsSource: [
    appRoot + '**/*.js',          // list files to parse for d.ts
    '!' + appRoot + entryFileName  // exclude entry file
  ],
  resources: '', // relative to root, resources can not that easily be bundled into a single file (due to naming conventions)
  html: appRoot + '**/*.html',
  style: 'styles/**/*.css',
  output: 'dist/',
  doc: './doc',
  theme: './node_modules/typedoc-markdown-theme/bin',
  test: './test/**/*.js',
  packageName: pkg.name
};
