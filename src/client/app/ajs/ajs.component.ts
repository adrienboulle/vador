import { Component, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare let window: any;
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/css/css';

import 'rxjs/add/operator/toPromise';

declare let ts: any;

@Component({
  selector: 'ajs',
  templateUrl: 'ajs.component.html',
})
export class AjsComponent {
  public code: { html: string, css: string, ts: string } = {
    html: '<app>\n' +
    '  <hello-cmp></hello-cmp>\n' +
    '</app>',
    css: 'app {\n' +
    '  background-color: #DBF5F4;\n' +
    '}',
    ts: 'import { Component } from \'ajs/lib/api\';\n' +
    '\n' +
    '@Component({\n' +
    '  selector: \'hello-cmp\',\n' +
    '  template: \'<div>Hello {{value}}</div>\',\n' +
    '})\n' +
    'export class LoloComp {\n' +
    '  public value: string;\n' +
    '\n' +
    '  constructor() {\n' +
    '    this.value = \'Wolrd!\';\n' +
    '  }\n' +
    '}\n',
  };
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
  private _iframe: ElementRef;

  constructor(private _http: HttpClient) {}

  public get isSsr(): boolean {
    return !window.isSsr;
  }

  public onFocus(): void {

  }

  public onBlur(): void {
    const out = this._transpileModule();

    if (!out) {
      return;
    }

    this._http
    .post('/ajspreview', {
      js: this._transpileModule(),
      css: this.code.css,
      html: this.code.html,
    })
    .toPromise()
    .then((rep: any) => {
      this._iframe.nativeElement.contentWindow.document.open();
      this._iframe.nativeElement.contentWindow.document.write(rep.content);
      this._iframe.nativeElement.contentWindow.document.close();
    })
    .catch(() => {});
  }

  private _transpileModule(): string|null {
    const inputFileName = 'module.ts';
    const sourceFile = ts.createSourceFile(inputFileName, this.code.ts, ts.ScriptTarget.ES5);

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

    return outputText;
  }
}
