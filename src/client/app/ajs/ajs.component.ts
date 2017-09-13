import { Component, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare let window: any;
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/css/css';

import 'rxjs/add/operator/toPromise';

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
    this._http
    .post( '/ajspreview', this.code)
    .toPromise()
    .then((rep: any) => {
      this._iframe.nativeElement.contentWindow.document.open();
      this._iframe.nativeElement.contentWindow.document.write(rep.content);
      this._iframe.nativeElement.contentWindow.document.close();
    })
    .catch(() => {});
  }
}
