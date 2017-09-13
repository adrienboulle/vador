'use strict';

import * as express from 'express';
import { Application, Router, Response } from 'express';

import * as bodyParser from 'body-parser';
import * as ejs from 'ejs';
// import * as minifyHTML from 'express-minify-html';

const expressLayouts = require('express-ejs-layouts');

import { context } from './middlewares/context';

import { CusRequest } from './tools/CusRequest';

import { indexRouter } from './routes/indexRoute';
import { ajspreviewRouter } from './routes/ajspreviewRoute';

const routes: { routes: string[], router: Router }[] = [
  indexRouter,
  ajspreviewRouter,
];

declare let global: any;

export class App {

  // ref to Express instance
  public express: Application;

  // Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
    this.express.set('view engine', 'ejs');
    this.express.engine('.ejs', ejs.__express);
    this.express.set('views', '.build/private/src/views');
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(express.static('.build/public'));
    this.express.use(context);
    this.express.use(bodyParser.json());
    this.express.use(expressLayouts);
    // this.express.use(minifyHTML({
    //   override: true,
    //   exception_url: false,
    //   htmlMinifier: {
    //     removeComments: true,
    //     collapseWhitespace: true,
    //     collapseBooleanAttributes: true,
    //     removeAttributeQuotes: true,
    //     removeEmptyAttributes: true,
    //     minifyJS: true,
    //   },
    // }));
  }

  // Configure API endpoints.
  private routes(): void {
    for (let route of routes) {
      this.express.use('/:lang', route.router);
      this.express.use('/', route.router);
    }

    this.express.use((req: CusRequest, res: Response) => {
      res.status(404);
      res.render('404', {
        layout: false,
      });
    });
  }
}

export const app: Application = new App().express;
