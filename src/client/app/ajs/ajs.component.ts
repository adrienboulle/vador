import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
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
      mode: 'text/html',
    },
    css: {
      lineNumbers: true,
      tabSize: 2,
      matchBrackets: true,
      mode: 'text/css',
    },
    ts: {
      lineNumbers: true,
      tabSize: 2,
      matchBrackets: true,
      mode: 'text/typescript',
    },
  };

  @ViewChild('iframe')
  public iframe: ElementRef;

  private _changeTimeout: any;

  constructor(private _http: HttpClient, private _localStorageService: LocalStorageService, private _renderer: Renderer2) {
    this.code = this._localStorageService.get('code') || {
      html: '<app>\n  <hello></hello>\n</app>',
      css: 'app {display: block;background-color: #DBF5F4;}\n.bold {font-weight: bold;}\n.italic {font-style: italic;}\n.underline {text-decoration: underline;}\n.hidden {display: none}\n.tip {color: #55a963;font-weight: bold;}',
      ts: 'import {Component, bootstrap, Service,\n        Input, Output, ElementRef } from \'ajs\';\n\n@Service()\nexport class ClassService {\n  public initValue: string;\n  public classes: string[] = [\'bold\', \'italic\', \'underline\'];\n\n  constructor() {\n    this.initValue = this.classes.join(\' \');\n  }\n\n  public getRandClasses(): string {\n    const from = this.classes.slice(0);\n\n    return Array(Math.floor(Math.random() * 3) + 1)\n    .join()\n    .split(\',\')\n    .map(() => {\n      const randIdx = Math.floor(Math.random() * from.length);\n\t\t\tconst val = from.splice(randIdx, 1);\n\n      return val[0];\n    })\n    .join(\' \');\n  }\n}\n\n@Component({\n  selector: \'hello\',\n  template: `\n\t\t<div>\n\t\t\t<div ajs-for="user of users">\n\t\t\t\t<input ajs-model="user.firstName"/>\n\t\t\t\t<input ajs-model="user.lastName"/>\n\t\t\t\t<span>{{user.firstName}}</span>\n\t\t\t\t<span>{{user.lastName}}</span>\n\t\t\t</div>\n\t\t\t<br>\n\t\t\t<input class="{{value}}" ajs-model="value"/>\n\t\t\t<inner></inner>\n\t\t</div>\n\t\t<btn></btn>\n\t`,\n})\nexport class Hello {\n  public value: string;\n  public users: string[] = [\n    {\n      firstName: \'John\',\n      lastName: \'Doe\',\n    },\n    {\n      firstName: \'Jeanne\',\n      lastName: \'Doe\',\n    },\n  ];\n\n  constructor(private classService: ClassService) {\n    this.value = classService.initValue;\n  }\n\n  clear(): void {\n  \tthis.value = \'\';\n  }\n\n  rand(): void {\n  \tthis.value = this.classService.getRandClasses();\n  }\n}\n\n@Component({\n  selector: \'inner\',\n  template: `\n  \t<div>Input class: {{value}}</div>\n\t\t<span class="tip hidden">You can clear or add random classes!</span>\n\t`,\n})\nexport class Inner {\n  @Input()\n  public value: string;\n\n  constructor(private _el: ElementRef) {}\n\n  onInit() {\n    setTimeout(() => {\n      this._el.nativeElement.querySelector(\'.tip\').classList.remove(\'hidden\');\n    }, 3000);\n  }\n}\n\n@Component({\n  selector: \'btn\',\n  template: `\n\t\t<button ajs-click="onClickClear">\n\t\t\tClear!\n\t\t</button>\n\t\t<button ajs-click="rand">\n\t\t\tGenerateRand!\n\t\t</button>\n\t`,\n})\nexport class Btn {\n  @Output(\'clear\')\n  public onClickClear: Function;\n\n  @Output(\'rand\')\n  public rand: Function;\n\n  constructor() {}\n}\n\nbootstrap({\n\twindow,\n  components:[Hello, Inner, Btn],\n  services:[ClassService],\n});\n',
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
                  script.src = '/js/render.umd.js';
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
