'use strict';

const gulp = require('gulp');

require('require-dir')('./gulp');

process.on('SIGINT', () => {
  process.exit();
});
