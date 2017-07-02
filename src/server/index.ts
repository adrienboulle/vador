// tslint:disable:no-console

'use strict';

declare let global: any;

import { app } from './App';
import { conf } from './conf';

import 'reflect-metadata';
import 'zone.js/dist/zone-node';

global.CONF = conf;

const port = conf.env.port || 1337;

app.listen(port, () => console.log(`Server listening on port ${port}!`));
