'use strict';

const fs = require('fs');
const rimraf = require('rimraf');
const domino = require('domino');

import { Router, Response, NextFunction } from 'express';

import { CusRequest } from '../tools/CusRequest';

const ajs = require('ajs');

const ajsDir = __dirname + '/../../../../../ajs';
const tmpDir = __dirname + '/../../../../../.tmp';

rimraf(ajsDir, () => {
  fs.mkdirSync(ajsDir);
  fs.writeFileSync(ajsDir + '/cmps.ts', '');
});
rimraf(tmpDir, () => {
  fs.mkdirSync(tmpDir);
});

const fnc = ajs();

declare let global: any;

export class AjspreviewRouter {
  public router: Router;
  public routes: string[];

  constructor() {
    this.router = Router();
    this.routes = ['/ajspreview'];
    this._init();
  }

  public index(req: CusRequest, res: Response, next: NextFunction) {
    const rand = Math.floor(1000000 * Math.random());

    req.body.html = req.body.html.replace(/\n/g, ' ');
    req.body.css = req.body.css.replace(/\n/g, ' ');

    fs.mkdirSync(ajsDir + '/' + rand);
    fs.writeFileSync(ajsDir + '/' + rand + '/cmps.ts', req.body.ts);

    fnc(null, { content: req.body.html, compile: true, subPath: rand }, (err, content) => {
      if (!err) {
        const window = domino.createWindow(content);
        const document = window.document;
        const head = document.querySelector('head');
        const style = document.createElement('style');
        style.innerHTML = req.body.css;
        head.appendChild(style);
        content = document.innerHTML;
      }

      res.send({ content: err ? 'ERROR' : content });

      rimraf(ajsDir + '/' + rand, () => {});
      rimraf(tmpDir + '/' + rand, () => {});
    });
  }

  private _init() {
    this.router.post(this.routes, this.index);
  }
}

export const ajspreviewRouter: AjspreviewRouter = new AjspreviewRouter();
