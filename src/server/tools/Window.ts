// tslint:disable:interface-name

'use strict';

import { conf } from '../conf';

export namespace Window {
  export function init(global: any = {}, meta?: any) {
    global.window = {};
    global.window.isSsr = true;
    global.window.meta = meta;
    global.window.env = {
      name: process.env.NODE_ENV || 'local',
      protocol: conf.env.site.protocol,
      frontHostname: conf.env.site.hostname,
    };
    global.window.cdn = {};
    global.window.cdn.one = conf.env.cdn.one;
    global.window.cdn.two = conf.env.cdn.two;
    global.window.cdn.three = conf.env.cdn.three;
  }
}
