'use strict';

const childProcess = require('child_process');

module.exports = {
  ts: gulp => () =>
    childProcess.exec('scripts/ts').stdout.on('data', data => {
      console.log(data.toString());
    }),
};
