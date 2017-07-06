'use strict';

import { Router, Response, NextFunction } from 'express';

// NGFACTORY-START-IS_AOT:true
import { renderModuleFactory } from '@angular/platform-server';
// NGFACTORY-END

import { CusRequest } from '../tools/CusRequest';
import { Window } from '../tools/Window';
import { MetaHelper } from '../tools/MetaHelper';
import { langHandler } from '../tools/langHandler';

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
    if (langHandler(req, res, next)) {
      return;
    }

    Window.init(global, MetaHelper.getMeta(req));

    res.render('index', {
      req,
      layout: false,
      baseHref: req.cusContext.baseHref,
    }, (err, html) => {
      if (err) {
        return next(err);
      }

      html = html.replace(/&#39;/g, '\'');

      // NGFACTORY-START-IS_AOT:true
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
