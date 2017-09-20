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
      html: '<app>\n  <hello></hello>\n</app>',
      css: 'app {\n  display: block;\n  background-color: #DBF5F4;\n}',
      ts: 'import { Component, bootstrap, Service, Input, Output, ElementRef } from \'ajs\';\n\n@Service()\nexport class MyService {\n  public initValue: string;\n\n  constructor() {\n    this.initValue = \'World!\';\n  }\n}\n\n@Component({\n  selector: \'hello\',\n  template: \'<div><input ajs-model="value"/><inner></inner></div><btn></btn>\',\n})\nexport class Hello {\n  public value: string;\n\tprivate alpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";\n  constructor(myService: MyService) {\n    this.value = myService.initValue;\n  }\n  \n  clear(): void {\n  \tthis.value = \'\';\n  }\n  \n  rand(): void {\n  \tthis.value = \nArray(10).join().split(\',\').map(() => this.alpha.charAt(Math.floor(Math.random() * this.alpha.length))).join(\'\');\n\n  }\n}\n\n@Component({\n  selector: \'inner\',\n  template: \'<div>Input: {{value}}</div>\',\n})\nexport class Inner {\n  @Input()\n  public value: string;\n  \n  constructor(el: ElementRef) {\n  \tel.nativeElement.addEventListener(\'click\', () => {\n    \tthis.onClick();\n    });\n  }\n}\n\n@Component({\n  selector: \'btn\',\n  template: \'<button class="clear">Clear!</button><button class="rand">GenerateRand!</button>\',\n})\nexport class Btn {\n  @Output(\'clear\')\n  public onClickClear: Function;\n  \n  @Output(\'rand\')\n  public rand: Function;\n  \n  constructor(el: ElementRef) {\n  \tel.nativeElement.querySelector(\'button.clear\')\n    .addEventListener(\'click\', () => {\n    \tthis.onClickClear();\n    });\n\t  el.nativeElement.querySelector(\'button.rand\')\n    .addEventListener(\'click\', () => {\n    \tthis.rand();\n    });\n  });\n}\n\nbootstrap({\n\twindow,\n  components:[Hello, Inner, Btn],\n  services:[MyService],\n})\n',
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
