'use strict';

const gulp = require('gulp');

require('require-dir')('./gulp/modules');
require('require-dir')('./gulp/registers');

process.on('SIGINT', () => {
  process.exit();
});
