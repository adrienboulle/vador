// KEEP-START-NODE_ENV:production
import {enableProdMode} from '@angular/core';
enableProdMode();
// KEEP-END

// KEEP-START-IS_AOT:true
import {platformBrowser} from '@angular/platform-browser';

import {AppBrowserModuleNgFactory} from './app.browser.module.ngfactory';

platformBrowser().bootstrapModuleFactory(AppBrowserModuleNgFactory);
// KEEP-END

// KEEP-START-IS_AOT:false
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppBrowserModule} from './app.browser.module';

platformBrowserDynamic().bootstrapModule(AppBrowserModule);
// KEEP-END
