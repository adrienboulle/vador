import { Component, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { LocalStorageService } from 'angular-2-local-storage';

import 'rxjs/add/operator/toPromise';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/css/css';

declare let window: any;

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
  private _iframe: ElementRef;

  private _changeTimeout: any;

  constructor(private _http: HttpClient, private _localStorageService: LocalStorageService) {
    this.code = this._localStorageService.get('code') || {
      html: '<app>\n  <hello-cmp></hello-cmp>\n</app>',
      css: 'app {\n  background-color: #DBF5F4;\n}',
      ts: 'import { Component } from \'ajs/lib/api\';\n\n@Component({\n  selector: \'hello-cmp\',\n  template: \'<div>Hello {{value}}</div>\',\n})\nexport class LoloComp {\n  public value: string;\n\n  constructor() {\n    this.value = \'Wolrd!\';\n  }\n}\n',
    };

    this.onChange(null);
  }

  public get isSsr(): boolean {
    return !window.isSsr;
  }

  public onChange(type: string|null, value?: string): void {
    if (type !== null) {
      this.code[type] = value;
    }

    if (this._changeTimeout) {
      clearTimeout(this._changeTimeout);
    }

    this._changeTimeout = setTimeout(() => {
      this._localStorageService.set('code', this.code);

      this._http
      .post('/ajspreview', this.code)
      .toPromise()
      .then((rep: any) => {
        this._iframe.nativeElement.contentWindow.document.open();
        this._iframe.nativeElement.contentWindow.document.write(rep.content);
        this._iframe.nativeElement.contentWindow.document.close();
      })
      .catch(() => {});
    }, 200);
  }
}
