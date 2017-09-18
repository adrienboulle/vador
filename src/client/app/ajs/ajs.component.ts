import {Component, ViewChild, ElementRef, Renderer2} from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { LocalStorageService } from 'angular-2-local-storage';

import 'rxjs/add/operator/toPromise';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/css/css';

declare let window: any;
declare let ts: any;

@Component({
  selector: 'ajs',
  templateUrl: 'ajs.component.html',
})
export class AjsComponent {
  public code: { html: string, css: string, ts: string };
  public config: { html: any, css: any, ts: any } = {
    html: {
      lineNumbers: true,
      tabSize: 2,
      matchBrackets: true,
      lineWrapping: true,
      mode: 'text/html',
    },
    css: {
      lineNumbers: true,
      tabSize: 2,
      matchBrackets: true,
      lineWrapping: true,
      mode: 'text/css',
    },
    ts: {
      lineNumbers: true,
      tabSize: 2,
      matchBrackets: true,
      lineWrapping: true,
      mode: 'text/typescript',
    },
  };

  @ViewChild('iframe')
  public iframe: ElementRef;

  private _changeTimeout: any;

  constructor(private _http: HttpClient, private _localStorageService: LocalStorageService, private _renderer: Renderer2) {
    this.code = this._localStorageService.get('code') || {
      html: '<app>\n  <hello-cmp></hello-cmp>\n</app>',
      css: 'app {\n  display: block;\n  background-color: #DBF5F4;\n}',
      ts: 'import { Component } from \'ajs\';\n\n@Component({\n  selector: \'hello-cmp\',\n  template: \'<div>Hello {{value}}</div>\',\n})\nexport class LoloComp {\n  public value: string;\n\n  constructor() {\n    this.value = \'World!\';\n  }\n}\n',
    };

    if (!this.isSsr) {
      this.onChange(null);
    }
  }

  public get isSsr(): boolean {
    return !!window.isSsr;
  }

  public onChange(type: string|null, value?: string): void {
    if (this.isSsr) {
      return;
    }

    if (type !== null) {
      this.code[type] = value;
    }

    if (this._changeTimeout) {
      clearTimeout(this._changeTimeout);
    }

    this._changeTimeout = setTimeout(() => {
      this._localStorageService.set('code', this.code);

      let inputFileName = 'module.ts';
      let sourceFile = ts.createSourceFile(inputFileName, this.code.ts, ts.ScriptTarget.ES5);

      // Output
      let outputText;

      ts.createProgram([inputFileName], {
        module: ts.ModuleKind.UMD,
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

      this.iframe.nativeElement.contentWindow.document.open();
      this.iframe.nativeElement.contentWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <style>
              ${this.code.css}
            </style>
          </head>
          <body>
            ${this.code.html}
            <script>
              var loaded = Promise.resolve();

              if (!window.Zone) {
                loaded = new Promise(function (resolve, reject) {
                  var script = document.createElement('script');
                  script.src = 'js/render.umd.js';
                  script.type = 'text/javascript';
                  script.onload = function () {
                    resolve();
                  }
                  document.querySelector('head').appendChild(script);
                });
              }
              var exports = {};
              var module = {
                exports: exports,
              };
              var require = function (val) {
                if (val === 'ajs') {
                  return window.ajs;
                }
              };

              loaded
              .then(function() {
                ${outputText}
              });
            </script>
          </body>
        </html>
      `);
      this.iframe.nativeElement.contentWindow.document.close();
    }, 100);
  }
}
