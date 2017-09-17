'use strict';

const fs = require('fs');
const rimraf = require('rimraf');
const domino = require('domino');
const ts = require('typescript');
const { VM } = require('vm2');

const ajs = require('ajs').__express;

import { Router, Response, NextFunction } from 'express';

import { CusRequest } from '../tools/CusRequest';

const tmpDir = __dirname + '/../../../../../.tmp';

rimraf(tmpDir, () => {
  fs.mkdirSync(tmpDir);
});

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
    const rand = Math.floor(100000000 * Math.random());

    req.body.html = req.body.html.replace(/\n/g, ' ');
    req.body.css = req.body.css.replace(/\n/g, ' ');
    req.body.ts = req.body.ts.replace(/`/g, '\'');

    const inputFileName = 'module.ts';
    const sourceFile = ts.createSourceFile(inputFileName, req.body.ts, ts.ScriptTarget.ES5);

    // Output
    let outputText;

    ts.createProgram(['module.ts'], {
      module: 1,
      noLib: true,
      noResolve: true,
      suppressOutputPathCheck: true,
      emitDecoratorMetadata: true,
      target: 1,
    }, {
      getSourceFile: fileName => fileName.indexOf('module') === 0 ? sourceFile : undefined,
      writeFile: (_name, text) => outputText = text,
      getDefaultLibFileName: () => 'lib.d.ts',
      useCaseSensitiveFileNames: () => false,
      getCanonicalFileName: fileName => fileName,
      getCurrentDirectory: () => '',
      getNewLine: () => '\n',
      fileExists: fileName => fileName === inputFileName,
      readFile: () => '',
      directoryExists: () => true,
      getDirectories: () => [],
    }).emit();

    fs.mkdirSync(tmpDir + '/' + rand);
    fs.writeFileSync(tmpDir + '/' + rand + '/cmps.js', `
      const { VM } = require('vm2');

      const localExports = {};

      const vm = new VM({
        timeout: 2000,
        sandbox: {
          Reflect,
          module: {},
          exports: localExports,
          console: {
            log: () => {},
          },
          require: val => {
            if (val === 'ajs') {
              return require('ajs');
            }
  
            throw Error('Not allowed to require ' + val);
          },
        },
      });

      vm.run(\`${outputText}\`);
      
      module.exports = localExports;
    `);

    ajs(null, { content: req.body.html, subPath: rand }, (err, content) => {
      if (!err) {
        const window = domino.createWindow(content);
        const document = window.document;
        const head = document.querySelector('head');
        const style = document.createElement('style');
        style.innerHTML = req.body.css;
        head.appendChild(style);
        content = document.innerHTML;
      }

      res.send({ content: err ? err : content });

      rimraf(tmpDir + '/' + rand, () => {});
    });
  }

  private _init() {
    this.router.post(this.routes, this.index);
  }
}

export const ajspreviewRouter: AjspreviewRouter = new AjspreviewRouter();
