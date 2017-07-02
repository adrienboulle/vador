'use strict';

import { Router, Response, NextFunction } from 'express';

// NGFACTORY-START-ISAOT:true
import { renderModuleFactory } from '@angular/platform-server';
// NGFACTORY-END

import { CusRequest } from '../tools/CusRequest';
import { Window } from '../tools/Window';
import { MetaHelper } from '../tools/MetaHelper';

export const otherLangs: string[] = [
  'en',
];

export const defaultLang: string = 'fr';

declare let global: any;

export class IndexRouter {
  public router: Router;
  public routes: string[];

  constructor() {
    this.router = Router({ mergeParams: true });
    this.routes = ['/contact', '/'];
    this._init();
  }

  public index(req: CusRequest, res: Response, next: NextFunction) {
    const lang = req.params.lang || defaultLang;

    if (req.params.lang && otherLangs.indexOf(req.params.lang) === -1) {
      return next();
    }

    req.cusContext.lang = lang;

    if (otherLangs.indexOf(lang) !== -1) {
      req.cusContext.baseHref = '/' + lang + '/';
    }

    Window.init(global, MetaHelper.getMeta(req));

    res.render('index', {
      req,
      layout: false,
      min: true,
      baseHref: req.cusContext.baseHref,
    }, (err, html) => {
      if (err) {
        return next(err);
      }

      // NGFACTORY-START-ISAOT:true
      renderModuleFactory(require('../../client/app/app.server.module.ngfactory').AppServerModuleNgFactory, {
        document: html,
        url: req.url,
      })
      .then(response => res.send(response));
      // NGFACTORY-END
    });
  }

  private _init() {
    this.router.get(this.routes, this.index);
  }
}

export const indexRouter: IndexRouter = new IndexRouter();
