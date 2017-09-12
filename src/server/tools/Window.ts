// tslint:disable:interface-name

'use strict';

const domino = require('domino');

import { conf } from '../conf';

export namespace Window {
  export function init(global: any = {}, meta?: any) {
    const window = domino.createWindow('');
    const document = window.document;

    global.window = window;
    global.document = document;
    global.navigator = window.navigator;
    global.window.isSsr = true;
    global.window.meta = meta;
    global.window.env = {
      name: process.env.NODE_ENV || 'local',
      protocol: conf.env.site.protocol,
      frontHostname: conf.env.site.hostname,
    };
    global.window.cdn = conf.env.cdn;
  }
}
