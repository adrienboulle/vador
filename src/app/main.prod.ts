import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModuleNgFactory} from '../../.aot/src/app/app.module.ngfactory';

enableProdMode();
platformBrowserDynamic().bootstrapModuleFactory(AppModuleNgFactory);
