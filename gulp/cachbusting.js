'use strict';

const crypto = require('crypto');

let cacheBuster = '';

try {
  cacheBuster = require('child_process').execSync('git rev-parse HEAD', { timeout: 1000 });
} catch (e) {
  cacheBuster = Math.random().toString(36).slice(-8);
}

module.exports = function cacheBusting() {
  return crypto.createHash('sha1').update(cacheBuster).digest('hex').substring(0, 20);
};
